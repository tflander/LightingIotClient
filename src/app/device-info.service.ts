import {Injectable} from '@angular/core';
import {DeviceInfo} from './device-info';
import {DEVICES} from './MockDevices';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceInfoService {

  constructor() { }

  getDeviceInfo(): Observable<DeviceInfo[]> {
    return of(DEVICES);
  }
}
