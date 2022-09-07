import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message, Visibility } from 'src/app/Models/message.models';
import { ChatService } from 'src/app/Services/chat.service';
import { LoginService } from 'src/app/Services/login.service';
import { SignalrService } from 'src/app/Services/signalr.service';

@Component({
  selector: 'app-messages-item',
  templateUrl: './messages-item.component.html',
  styleUrls: ['./messages-item.component.css'],
})
export class MessagesItemComponent implements OnInit {
  @Input() message!: Message;
  @Input() loginUserName!: string;
  @Input() messageReplyTo?: Message;
  isEditEnable: boolean = false;
  isDeleteEnable: boolean = false;
  chatid!: number;
  constructor(
    private route: ActivatedRoute,
    private chatservice: ChatService,
    private signalrservice: SignalrService,
    private loginservice: LoginService
  ) {}
  ngOnInit(): void {
    if (!this.messageReplyTo == undefined) {
      this.chatservice
        .getMessageById(this.message.replyTo)
        .subscribe((message) => (this.messageReplyTo = message));
    }
  }

  onEdit() {
    this.isEditEnable = !this.isEditEnable;
  }

  onDelete() {
    this.isDeleteEnable = !this.isDeleteEnable;
  }

  editSubmit(text: string) {
    this.message.text = text;
    this.chatservice.editMessage(this.message).subscribe();
  }

  deleteSubmit(deleteType: string) {
    if (deleteType == 'DeleteForSender') {
      this.chatservice.deleteMessageForSender(this.message).subscribe();
    } else {
      this.chatservice.deleteMessage(this.message).subscribe();
    }
  }

  checkIfVisible(): boolean {
    return !(
      this.message.userName == this.loginUserName &&
      this.message.visibility == Visibility.EveryoneNoSender
    );
  }
}
