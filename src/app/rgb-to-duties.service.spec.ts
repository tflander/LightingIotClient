import { TestBed } from '@angular/core/testing';
import {ColorPickerService} from 'ngx-color-picker';
import { RgbToDutiesService } from './rgb-to-duties.service';
import {ColorDuties} from './colorDuties';

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
    expect(service.dutiesFrom('#000000')).toEqual(new ColorDuties());
  });

  it('generates pure white', () => {
    const expectedDuties = new ColorDuties();
    expectedDuties.White = 1023;
    expect(service.dutiesFrom('#ffffff')).toEqual(new ColorDuties());
  });

  it('generates pure red', () => {
    const expectedDuties = new ColorDuties();
    expectedDuties.Red = 1023;
    expect(service.dutiesFrom('#ff0000')).toEqual(expectedDuties);
  });

  it('generates pure green', () => {
    const expectedDuties = new ColorDuties();
    expectedDuties.Green = 1023;
    expect(service.dutiesFrom('#00ff00')).toEqual(expectedDuties);
  });

  it('generates pure blue', () => {
    const expectedDuties = new ColorDuties();
    expectedDuties.Blue = 1023;
    expect(service.dutiesFrom('#0000ff')).toEqual(expectedDuties);
  });

  it('generates pure magenta', () => {
    const expectedDuties = new ColorDuties();
    expectedDuties.Blue = 1023;
    expectedDuties.Red = 1023;
    expect(service.dutiesFrom('#ff00ff')).toEqual(expectedDuties);
  });

  it('generates pure cyan', () => {
    const expectedDuties = new ColorDuties();
    expectedDuties.Blue = 1023;
    expectedDuties.Green = 1023;
    expect(service.dutiesFrom('#00ffff')).toEqual(expectedDuties);
  });

  it('generates pure yellow', () => {
    const expectedDuties = new ColorDuties();
    expectedDuties.Green = 1023;
    expectedDuties.Red = 1023;
    expect(service.dutiesFrom('#ffff00')).toEqual(expectedDuties);
  });

});
