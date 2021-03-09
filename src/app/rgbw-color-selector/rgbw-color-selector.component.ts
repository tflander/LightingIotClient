import {Component, Input, OnInit} from '@angular/core';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { DeviceInfo} from '../device-info';

@Component({
  selector: 'app-rgbw-color-selector',
  templateUrl: './rgbw-color-selector.component.html',
  styleUrls: ['./rgbw-color-selector.component.sass']
})
export class RgbwColorSelectorComponent implements OnInit {

  @Input()
  device!: DeviceInfo;

  public color1 = '#2889e9';  // TODO: set to current color

  // TODO: event processing per
  //   https://stackblitz.com/github/zefoy/ngx-color-picker/tree/master?file=projects%2Fapp%2Fsrc%2Fapp%2Fapp.component.ts

  public onEventLog(event: string, data: any): void {
    console.log(event, data);
  }

  constructor(private cpService: ColorPickerService) { }

  ngOnInit(): void {
  }

}
