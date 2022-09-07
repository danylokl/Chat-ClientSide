import { Data } from '@angular/router';
export enum Visibility {
  Everyone,
  EveryoneNoSender,
}
export interface Message {
  messageId: number;
  userName: string;
  chatId: number;
  sendTime: string;
  text: string;
  visibility: Visibility;
  replyTo: number;
}
