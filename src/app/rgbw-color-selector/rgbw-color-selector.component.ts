import { Component, OnInit } from '@angular/core';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';

@Component({
  selector: 'app-rgbw-color-selector',
  templateUrl: './rgbw-color-selector.component.html',
  styleUrls: ['./rgbw-color-selector.component.sass']
})
export class RgbwColorSelectorComponent implements OnInit {

  public color1 = '#2889e9';

  public onEventLog(event: string, data: any): void {
    console.log(event, data);
  }

  constructor(private cpService: ColorPickerService) { }

  ngOnInit(): void {
  }

}
