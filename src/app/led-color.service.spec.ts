import { TestBed } from '@angular/core/testing';

import { LedColorService } from './led-color.service';

describe('LedColorService', () => {
  let service: LedColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LedColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
