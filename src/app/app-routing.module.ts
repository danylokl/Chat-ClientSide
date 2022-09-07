import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './identity.guard';
import { ChatmessagesComponent } from './main-chat/chatmessages/chatmessages.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { UserIdentityComponent } from './user-identity/user-identity.component';

const routes: Routes = [
  {
    path: 'chat',
    component: MainChatComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [{ path: ':id', component: ChatmessagesComponent }],
  },
  { path: 'login', component: UserIdentityComponent },
  { path: '', component: UserIdentityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
