import {Injectable} from '@angular/core';
import {DeviceInfo} from './device-info';
import {DEVICES} from './MockDevices';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceInfoService {

  private deviceUrl = '/api/info';

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  // TODO: handle multiple devices, e.g. Observable<DeviceInfo[]>
  getDeviceInfo(): Observable<DeviceInfo> {
    // const observable = of(DEVICES);
    const observable = this.http.get<DeviceInfo>(this.deviceUrl);
    this.messageService.add('DeviceInfoService: fetched devices');
    console.log(observable);
    return observable;
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
