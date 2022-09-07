import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainChatComponent } from './main-chat/main-chat.component';

import { ChatmessagesComponent } from './main-chat/chatmessages/chatmessages.component';
import { ChatService } from './Services/chat.service';
import { LoginService } from './Services/login.service';
import { UserIdentityComponent } from './user-identity/user-identity.component';
import { AuthGuard } from './identity.guard';
import { MessagesItemComponent } from './main-chat/chatmessages/messages-item/messages-item.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    MainChatComponent,
    UserIdentityComponent,
    ChatmessagesComponent,
    MessagesItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
  ],
  providers: [ChatService, LoginService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
