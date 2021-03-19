import {Component, Input, OnInit} from '@angular/core';
import {ColorPickerService} from 'ngx-color-picker';
import {DeviceInfo} from '../device-info';
import {ColorDuties} from '../colorDuties';
import {MessageService, MessageSeverity} from '../message.service';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-rgbw-color-selector',
  templateUrl: './rgbw-color-selector.component.html',
  styleUrls: ['./rgbw-color-selector.component.sass']
})
export class RgbwColorSelectorComponent implements OnInit {

  @Input()
  device!: DeviceInfo;

  public rgbColor = 'undefined';
  public whiteIntensity = '#000';
  public deviceName = 'Unknown Device';

  results$: Observable<any> | undefined;
  subject = new Subject();

  constructor(
    private cpService: ColorPickerService,
    private messageService: MessageService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.initFromLedDuties();
    this.resolveDeviceName();

    this.results$ = this.subject.pipe(
      debounceTime(300),
      map(_ => this.updateLeds())
    );

  }

  public changeColor(color: string): void {
    this.rgbColor = color;
    this.subject.next(`rgb: ${this.rgbColor}`);
  }

  public changeWhite(color: string): void {
    this.whiteIntensity = color;
    this.subject.next(`white: ${this.whiteIntensity}`);
  }

  private updateLeds(): void {
    const ip = this.device.IP;
    const proxyBaseUrl = `/device${ip.substr(ip.lastIndexOf('.') + 1)}`;

    this.device.duties = this.updateDeviceDutiesFromWebPage();

    const url = `${proxyBaseUrl}/colors`;
    const colors = this.device.duties;
    const body = '{' +
      `\t"Red": ${colors.Red}\n` +
      `\t"Green": ${colors.Green}\n` +
      `\t"Blue": ${colors.Blue}\n` +
      `\t"White": ${colors.White}\n` +
      '}';

    this.httpClient.put<any>(url, body)
      .subscribe({
        next: data => {
          this.messageService.add(MessageSeverity.Info, `color set to ${JSON.stringify(data)}`);
        },
        error: err => {
          console.error(err.status);
          let msg = JSON.stringify(err);
          if(err.status === 0) {
            msg = `Unable to contact device at proxy url ${proxyBaseUrl}. Try refreshing the page.`;
          }
          this.messageService.add(MessageSeverity.Error, msg);
        }
      });
  }

  private updateDeviceDutiesFromWebPage(): ColorDuties {

    const colors = new class implements ColorDuties {
      Blue!: number;
      Green!: number;
      Red!: number;
      UltraViolet!: number;
      White!: number;
    }();
    colors.Red = 0;
    colors.Blue = 0;
    colors.Green = 0;
    colors.White = 0;
    colors.UltraViolet = 0;

    const hsva = this.cpService.stringToHsva(this.rgbColor);
    if (hsva) {
      const rgba = this.cpService.hsvaToRgba(hsva);
      colors.Red = Math.round(rgba.r * 1023);
      colors.Green = Math.round(rgba.g * 1023);
      colors.Blue = Math.round(rgba.b * 1023);
    }

    const whiteAsHex = this.whiteIntensity.substr(1, 2 );
    const white8Bit = parseInt(String(Number(`0x${whiteAsHex}`)), 10);
    colors.White = white8Bit * 4;
    return colors;
  }

  private resolveDeviceName(): void {
    if (this.device.MacAddress === '3c:71:bf:6d:16:bc') {
      this.deviceName = 'Original RGBW + UV prototype';
    } else if (this.device.MacAddress === '7c:9e:bd:f2:ed:24') {
      this.deviceName = 'TV Ambient Lighting';
    } else {
      this.deviceName += (' with MAC Address [' + this.device.MacAddress + ']');
    }
  }

  private initFromLedDuties(): void {
    if (this.device.duties)
    {
      const scaledColors = new class implements ColorDuties {
        Red!: number;
        Green!: number;
        Blue!: number;
        White!: number;
        UltraViolet!: number;
      }();

      /* tslint:disable:no-bitwise */
      scaledColors.Red = this.device.duties.Red >> 2;
      scaledColors.Green = this.device.duties.Green >> 2;
      scaledColors.Blue = this.device.duties.Blue >> 2;
      scaledColors.White = this.device.duties.White >> 2;
      scaledColors.UltraViolet = this.device.duties.UltraViolet >> 2;
      /* tslint:enable:no-bitwise */

      this.rgbColor = this.colorToHexRgb(scaledColors);

      const white8bitHex = (this.device.duties.White >> 2).toString(15).padStart(2, '0');
      this.whiteIntensity = `#${white8bitHex}${white8bitHex}${white8bitHex}`;
    }
  }

  private colorToHexRgb(color: ColorDuties): string {
      console.log(color);
      const r = Math.round(color.Red).toString(16).padStart(2, '0');
      const g = Math.round(color.Green).toString(16).padStart(2, '0');
      const b = Math.round(color.Blue).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`;
  }
}
