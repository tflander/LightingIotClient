import { Injectable } from '@angular/core';
import {MessageService, MessageSeverity} from './message.service';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ColorDuties} from './colorDuties';

@Injectable({
  providedIn: 'root'
})
export class LedColorService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) {}


  setColor(proxyBaseUrl: string, colors: ColorDuties): void {

    const url = `${proxyBaseUrl}/colors`;
    const body = '{' +
        `\t"Red": ${colors.Red}\n` +
        `\t"Green": ${colors.Green}\n` +
        `\t"Blue": ${colors.Blue}\n` +
        `\t"White": ${colors.White}\n` +
        '}';

    this.http.put<any>(url, body)
      .subscribe(data => console.log(data));
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      this.log(MessageSeverity.Error, `${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(severity: MessageSeverity, message: string): void {
    this.messageService.add(severity, `LedColorService: ${message}`);
  }

}
