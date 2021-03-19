import { Injectable } from '@angular/core';

export enum MessageSeverity {
  Info = 'Info',
  Error = 'Error',
}

class Message {
  severity: MessageSeverity = MessageSeverity.Info;
  message = '';
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];

  add(severity: MessageSeverity, message: string): void {
    const msg = new Message();
    msg.severity = severity;
    msg.message = message;
    this.messages.push(msg);
  }

  clear(): void {
    this.messages = [];
  }
}
