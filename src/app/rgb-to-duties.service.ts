import { Injectable } from '@angular/core';
import {ColorPickerService} from 'ngx-color-picker';
import {IColorDuties} from './colorDuties';

@Injectable({
  providedIn: 'root'
})
export class RgbToDutiesService {

  constructor(private cpService: ColorPickerService) { }

  public dutiesFrom(rgb: string): {} {

    const duties: {} = {
      Red: 0,
      Green: 0,
      Blue: 0,
      White: 0
    };
    const hsva = this.cpService.stringToHsva(rgb);
    if (hsva) {
      const rgba = this.cpService.hsvaToRgba(hsva);
      console.log(rgba);
//      let red = rgba.r;
      let white = 0;
      if (rgb === '#ffffff') {
        white = 1023;
      }
    }

    return duties;
  }
}
