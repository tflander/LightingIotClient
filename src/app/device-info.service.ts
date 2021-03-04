import { Injectable } from '@angular/core';
import { DeviceInfo } from './device-info';
import { DEVICES } from './MockDevices';

@Injectable({
  providedIn: 'root'
})
export class DeviceInfoService {

  constructor() { }

  getDeviceInfo(): DeviceInfo[] {
    return DEVICES;
  }
}
