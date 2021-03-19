import {Injectable} from '@angular/core';
import {DeviceInfo} from './device-info';
import {DEVICES} from './MockDevices';
import {Observable, of} from 'rxjs';
import {MessageService, MessageSeverity} from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceInfoService {

  private deviceUrls: string[];

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) {
    this.deviceUrls = [];
    for (let i = 2; i <= 20; i++) {
      this.deviceUrls.push(`/device${i}/info`);
    }
  }

  getDeviceInfo(): Observable<DeviceInfo>[] {

    const devices$: Observable<DeviceInfo>[] = [];
    this.deviceUrls.forEach(url => devices$.push(
      this.http.get<DeviceInfo>(url)
        .pipe(
          tap(_ => this.log(MessageSeverity.Info, `found device at url ${url}`)),
          catchError(this.handleError<DeviceInfo>('getDeviceInfo', undefined))
    )));

    return devices$;
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      this.log(MessageSeverity.Error, `${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(severity: MessageSeverity, message: string): void {
    this.messageService.add( severity, `DeviceInfoService: ${message}`);
  }
}
