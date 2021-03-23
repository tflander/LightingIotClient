import { TestBed } from '@angular/core/testing';
import {ColorPickerService} from 'ngx-color-picker';
import { RgbToDutiesService } from './rgb-to-duties.service';
import {ColorDuties} from './colorDuties';
import {GroupedObservable} from 'rxjs';

describe('RgbToDutiesService', () => {
  let service: RgbToDutiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorPickerService]
    });
    service = TestBed.inject(RgbToDutiesService);
  });

  const runs = [
    { desc: 'black',           rgb: '#000000', expected: {} },
    { desc: 'bright white',    rgb: '#ffffff', expected: {White: 1023} },
    { desc: 'bright red',      rgb: '#ff0000', expected: {Red: 1023} },
    { desc: 'bright green',    rgb: '#00ff00', expected: {Green: 1023} },
    { desc: 'bright blue',     rgb: '#0000ff', expected: {Blue: 1023} },
    { desc: 'bright cyan',     rgb: '#00ffff', expected: {Green: 1023, Blue: 1023} },
    { desc: 'bright magenta',  rgb: '#ff00ff', expected: {Red: 1023, Blue: 1023} },
    { desc: 'bright yellow',   rgb: '#ffff00', expected: {Red: 1023, Green: 1023} },
    { desc: 'med cyan',        rgb: '#007F7F', expected: {Green: 1023, Blue: 1023} },
    { desc: 'med magenta',     rgb: '#7F007F', expected: {Red: 1023, Blue: 1023} },
    { desc: 'med yellow',      rgb: '#7F7F00', expected: {Red: 1023, Green: 1023} },
  ];

  describe('dutiesFrom(rgb)',  () => {
    runs.forEach(run =>  {
      it(`${run.desc}: when dutiesFrom(${run.rgb}) then expect ${JSON.stringify(run.expected)}`,  () => {
        const result = service.dutiesFrom(run.rgb);
        expect(result).toEqual(expectedDuties(run.expected));
      });
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  function expectedDuties({Red = 0, Green = 0, Blue = 0, White = 0}): ColorDuties {
    const duties = new ColorDuties();
    duties.Red = Red;
    duties.Green = Green;
    duties.Blue = Blue;
    duties.White = White;
    return duties;
  }
});

