import { TestBed } from '@angular/core/testing';

import { DeviceInfoService } from './device-info.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DeviceInfoService', () => {
  let service: DeviceInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(DeviceInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
