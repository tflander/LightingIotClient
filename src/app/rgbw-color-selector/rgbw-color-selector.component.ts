import {Component, Input, OnInit} from '@angular/core';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { DeviceInfo} from '../device-info';
import {ColorDuties} from '../colorDuties';

@Component({
  selector: 'app-rgbw-color-selector',
  templateUrl: './rgbw-color-selector.component.html',
  styleUrls: ['./rgbw-color-selector.component.sass']
})
export class RgbwColorSelectorComponent implements OnInit {

  @Input()
  device!: DeviceInfo;

  public rgbColor = '#2889e9';  // TODO: set to current color
  public scaledColors: ColorDuties;
  public deviceName = 'Unknown Device';

  public changeColor(data: any): void {
    console.log('TODO: change color', data.color);
    console.log(this.colorToHexRgb(data.color));
  }

  constructor(private cpService: ColorPickerService) {
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
    }
  }

  private colorToHexRgb(color: any): string {
    const hsva = this.cpService.stringToHsva(color);
    if (hsva) {
      const rgba = this.cpService.hsvaToRgba(hsva);
      const r = Math.round(rgba.r * 255).toString(16);
      const g = Math.round(rgba.g * 255).toString(16);
      const b = Math.round(rgba.b * 255).toString(16);
      return '#' + r + g + b;
    }
    return '';
  }
}
