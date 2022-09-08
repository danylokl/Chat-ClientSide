import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Message } from '../Models/message.models';
@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  constructor() {}
  public data!: Message[];
  public hubConnection!: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://chat-reenbit20220908035012.azurewebsites.net/chathub', {
        withCredentials: true,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };
}
