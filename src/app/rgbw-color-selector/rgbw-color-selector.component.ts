import {Component, Input, OnInit} from '@angular/core';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { DeviceInfo} from '../device-info';
import {ColorDuties} from '../colorDuties';
import {LedColorService} from '../led-color.service';

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

  constructor(
    public ledColorService: LedColorService,
    private cpService: ColorPickerService
  ) {}

  ngOnInit(): void {
    this.initFromLedDuties();
    this.resolveDeviceName();
  }

  public changeColor(color: string): void {
    const ip = this.device.IP;
    this.rgbColor = color;
    const proxyBaseUrl = `/device${ip.substr(ip.lastIndexOf('.') + 1)}`;
    this.updateLeds(proxyBaseUrl);
  }

  // TODO: remember current color and white, and modify/refactor this.rgbStringToColorDuties() to use both values
  public changeWhite(color: string): void {
    const intensityAsHex = color.substr(1, 2 );
    const intensity8Bit = parseInt(String(Number(`0x${intensityAsHex}`)), 10);
    const intensity10Bit = intensity8Bit * 4;
    console.log(intensity10Bit);
  }

  private updateLeds(proxyBaseUrl: string): void {
    this.device.duties = this.updateDeviceDutiesFromWebPage();
    this.ledColorService.setColor(proxyBaseUrl, this.device.duties);
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
    }
  }

  private colorToHexRgb(color: ColorDuties): string {
      console.log(color);
      const r = Math.round(color.Red).toString(16).padStart(2, '0');
      const g = Math.round(color.Green).toString(16).padStart(2, '0');
      const b = Math.round(color.Blue).toString(16).padStart(2, '0');
      return '#' + r + g + b;
  }
}
