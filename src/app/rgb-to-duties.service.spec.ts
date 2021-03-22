import { TestBed } from '@angular/core/testing';

import { RgbToDutiesService } from './rgb-to-duties.service';

describe('RgbToDutiesService', () => {
  let service: RgbToDutiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RgbToDutiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
