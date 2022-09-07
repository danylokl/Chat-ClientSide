import { Component, OnInit } from '@angular/core';

import { Chat } from '../Models/chat.models';
import { ChatService } from '../Services/chat.service';
import { Location } from '@angular/common';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { timeout, timer } from 'rxjs';
@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.css'],
})
export class MainChatComponent implements OnInit {
  constructor(
    private chatservice: ChatService,
    private location: Location,
    private loginservice: LoginService,
    private router: Router
  ) {}
  chats!: Chat[];
  username!: string;
  id!: number;
  ngOnInit(): void {
    this.loginservice
      .getUserName()
      .subscribe((p) => (this.username = p.userName));

    this.chatservice.getAllChats().subscribe({
      next: (chat) => {
        this.chats = chat.filter((p) =>
          p.users.some((e) => e.username == this.username)
        );
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  getid(): number {
    this.id = this.chats[0].chatId;
    return this.id;
  }
  redirection(id: number) {
    this.router.navigate(['/chat', id]);
  }

  onLogout() {
    this.loginservice.onLogout().subscribe();
    this.router.navigate(['/login']);
  }
}
