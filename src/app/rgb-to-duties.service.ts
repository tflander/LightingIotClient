import { Injectable } from '@angular/core';
import {ColorPickerService} from 'ngx-color-picker';
import {ColorDuties, IColorDuties} from './colorDuties';

@Injectable({
  providedIn: 'root'
})
export class RgbToDutiesService {

  constructor(private cpService: ColorPickerService) { }

  public dutiesFrom(rgb: string): IColorDuties {

    const duties = new ColorDuties();

    const hsva = this.cpService.stringToHsva(rgb);
    if (hsva) {
      const rgba = this.cpService.hsvaToRgba(hsva);
      duties.Red = Math.round(rgba.r * 1023);
      duties.Green = Math.round(rgba.g * 1023);
      duties.Blue = Math.round(rgba.b * 1023);

      const white = Math.min(duties.Red, duties.Green, duties.Blue);
      duties.White = white;
      duties.Red -= white;
      duties.Green -= white;
      duties.Blue -= white;
    }
    return duties;
  }
}
