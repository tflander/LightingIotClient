import {Injectable} from '@angular/core';
import {DeviceInfo} from './device-info';
import {DEVICES} from './MockDevices';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceInfoService {

  // TODO: find a better way
  private deviceUrls = [
    '/api5/info',
    '/api6/info',
    '/api7/info',
    '/api8/info',
  ];

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  getDeviceInfo(): Observable<DeviceInfo>[] {

    const devices$: Observable<DeviceInfo>[] = [];
    this.deviceUrls.forEach(url => devices$.push(
      this.http.get<DeviceInfo>(url)
        .pipe(
          tap(_ => this.log(`trying device at url ${url}`)),
          catchError(this.handleError<DeviceInfo>('getDeviceInfo', undefined))
    )));

    return devices$;
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }
}
