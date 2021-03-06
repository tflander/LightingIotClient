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

  private deviceUrl = '/api5/info';

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  // TODO: handle multiple devices, e.g. Observable<DeviceInfo[]>
  getDeviceInfo(): Observable<DeviceInfo> {

    // Return mocks
    // return of(DEVICES);

    return this.http.get<DeviceInfo>(this.deviceUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<DeviceInfo>('getHeroes', undefined))
      );
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
