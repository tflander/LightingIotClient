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
  public scaledColors: ColorDuties;
  public deviceName = 'Unknown Device';

  constructor(
    public ledColorService: LedColorService,
    private cpService: ColorPickerService
  ) {
    this.scaledColors = new class implements ColorDuties {
      Red!: number;
      Green!: number;
      Blue!: number;
      White!: number;
      UltraViolet!: number;
    }();
  }

  ngOnInit(): void {
    this.scale10bitTo8bit();
    this.resolveDeviceName();
  }

  public changeColor(data: any): void {
    console.log(`color change to ${data.color}`);
    console.log(data);
    this.ledColorService.setColor('/device5', this.rgbStringToColorDuties(data.color));  // TODO: inject device URL
  }

  private rgbStringToColorDuties(rgbColors: string): ColorDuties {

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

    const hsva = this.cpService.stringToHsva(rgbColors);
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

  private scale10bitTo8bit(): void {
    if (this.device.duties)
    {
      /* tslint:disable:no-bitwise */
      this.scaledColors.Red = this.device.duties.Red >> 2;
      this.scaledColors.Green = this.device.duties.Green >> 2;
      this.scaledColors.Blue = this.device.duties.Blue >> 2;
      this.scaledColors.White = this.device.duties.White >> 2;
      this.scaledColors.UltraViolet = this.device.duties.UltraViolet >> 2;
      /* tslint:enable:no-bitwise */

      this.rgbColor = this.colorToHexRgb(this.scaledColors);
    }
  }

  private colorToHexRgb(color: ColorDuties): string {
      const r = Math.round(color.Red).toString(16).padStart(2, '0');
      const g = Math.round(color.Green).toString(16).padStart(2, '0');
      const b = Math.round(color.Blue).toString(16).padStart(2, '0');
      return '#' + r + g + b;
  }
}
