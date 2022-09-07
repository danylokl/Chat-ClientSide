import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Message, Visibility } from 'src/app/Models/message.models';
import { ChatService } from 'src/app/Services/chat.service';
import { LoginService } from 'src/app/Services/login.service';
import { SignalrService } from 'src/app/Services/signalr.service';
import { of, tap, map } from 'rxjs';
@Component({
  selector: 'app-chatmessages',
  templateUrl: './chatmessages.component.html',
  styleUrls: ['./chatmessages.component.css'],
})
export class ChatmessagesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private chatservice: ChatService,
    private signalrservice: SignalrService,
    private loginservice: LoginService
  ) {}
  MessageReplyTo!: Message;
  Messages!: Message[];
  loginUserName!: string;
  messageToReply!: Message;
  replyTo: number = 0;
  chatid!: number;
  page: number = 1;
  ngOnInit(): void {
    this.getMessages();
    this.loginservice
      .getUserName()
      .subscribe((username) => (this.loginUserName = username.userName));
    this.signalrservice.startConnection();

    this.signalrservice.hubConnection.on('messageData', () => {
      this.getMessages();
    });
  }

  getMessages() {
    this.chatid = Number(this.route.snapshot.paramMap.get('id'));
    this.chatservice
      .getMessagesFromChat(this.chatid, this.page)
      .pipe(tap(console.log))
      .subscribe((messages) => (this.Messages = messages));
  }

  onSubmit(messagetext: string) {
    const data: Message = {
      messageId: 0,
      chatId: this.chatid,
      text: messagetext,
      sendTime: Date.now().toString(),
      userName: '',
      visibility: Visibility.Everyone,
      replyTo: this.replyTo,
    };
    this.chatservice.sendMessage(data).subscribe();
  }

  messageReplyTo(message: any) {
    this.messageToReply = message;
    this.replyTo = message.messageId;
    this.Messages.find((message) => (message.messageId = this.replyTo));
  }

  onScroll() {
    this.page = this.page + 1;
    this.getMessages();
  }

  repliedMessage(id: number): any {
    var result: any = this.Messages.find((p) => p.messageId === id);
    return result;
  }
}
