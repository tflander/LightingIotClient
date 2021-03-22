import { TestBed } from '@angular/core/testing';
import {ColorPickerService} from 'ngx-color-picker';
import { RgbToDutiesService } from './rgb-to-duties.service';

describe('RgbToDutiesService', () => {
  let service: RgbToDutiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorPickerService]
    });
    service = TestBed.inject(RgbToDutiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('generates black', () => {
    expect(service.dutiesFrom('#000000')).toEqual(
      {
        Red: 0,
        Green: 0,
        Blue: 0,
        White: 0
      }
      );
  });

  it('generates pure white', () => {
    expect(service.dutiesFrom('#ffffff')).toEqual(
      {
        Red: 0,
        Green: 0,
        Blue: 0,
        White: 1023
      }
    );
  });

  it('generates pure red', () => {
    expect(service.dutiesFrom('#ff0000')).toEqual(
      {
        Red: 1023,
        Green: 0,
        Blue: 0,
        White: 0
      }
    );
  });

});
