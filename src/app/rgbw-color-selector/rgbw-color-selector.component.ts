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

  public color1 = '#2889e9';  // TODO: set to current color
  public scaledColors: ColorDuties;

  // TODO: event processing per
  //   https://stackblitz.com/github/zefoy/ngx-color-picker/tree/master?file=projects%2Fapp%2Fsrc%2Fapp%2Fapp.component.ts

  public onEventLog(event: string, data: any): void {
    console.log(event, data);
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
    if (this.device.duties) {
      this.scaledColors.Red = Math.floor(this.device.duties.Red / 4);
      this.scaledColors.Green = Math.floor(this.device.duties.Green / 4);
      this.scaledColors.Blue = Math.floor(this.device.duties.Blue / 4);
      this.scaledColors.White = Math.floor(this.device.duties.White / 4);
      this.scaledColors.UltraViolet = Math.floor(this.device.duties.UltraViolet / 4);
    }
  }

}
