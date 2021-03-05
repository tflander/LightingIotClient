import {Injectable} from '@angular/core';
import {DeviceInfo} from './device-info';
import {DEVICES} from './MockDevices';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceInfoService {

  constructor(private messageService: MessageService) { }

  getDeviceInfo(): Observable<DeviceInfo[]> {
    const observable = of(DEVICES);
    this.messageService.add('DeviceInfoService: fetched devices');
    return observable;
  }
}
