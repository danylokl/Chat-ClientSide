import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chat } from '../Models/chat.models';
import { Message } from '../Models/message.models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  baseApiUrl: string = 'https://chat-reenbit20220908035012.azurewebsites.net';
  constructor(private http: HttpClient) {}
  getAllChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.baseApiUrl + '/Index', {
      withCredentials: true,
    });
  }
  getChatById(id: number): Observable<Chat> {
    return this.http.get<Chat>(this.baseApiUrl + '/chat/' + id, {
      withCredentials: true,
    });
  }
  getMessagesFromChat(id: number, pagenumber: number): Observable<Message[]> {
    return this.http.get<Message[]>(
      this.baseApiUrl + '/chatHub/' + id + '/' + pagenumber,
      {
        withCredentials: true,
      }
    );
  }
  getMessageById(id: number): Observable<Message> {
    return this.http.get<Message>(this.baseApiUrl + '/GetMessageById/' + id, {
      withCredentials: true,
    });
  }
  sendMessage(message: Message): Observable<Response> {
    return this.http.post<Response>(this.baseApiUrl + '/SendMessage', message, {
      withCredentials: true,
    });
  }

  editMessage(message: Message): Observable<Response> {
    return this.http.put<Response>(this.baseApiUrl + '/EditMessage', message, {
      withCredentials: true,
    });
  }
  deleteMessage(message: Message): Observable<Response> {
    return this.http.delete<Response>(this.baseApiUrl + '/DeleteMessage', {
      withCredentials: true,
      body: message,
    });
  }
  deleteMessageForSender(message: Message): Observable<Response> {
    return this.http.delete<Response>(
      this.baseApiUrl + '/DeleteMessageForSender',
      {
        body: message,
        withCredentials: true,
      }
    );
  }
  GetUserChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.baseApiUrl + '/Index', {
      withCredentials: true,
    });
  }
}
