import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

import { UserNameDialogComponent } from './user-name-dialog/user-name-dialog.component';
import { Message } from './model/message.model';

import { ChatService } from './service/chat.service';
import { MessagesService } from './service/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  private counter:number;
  username: String;
  messageList: Observable<Message[]>;
  connection;

  constructor(public dialog: MatDialog,
              private el: ElementRef,
              private messageService: MessagesService, 
              private chatservice: ChatService) {}

  ngOnInit() {
    this.counter = 0;
    this.openDialog();
    this.receiveSlackMessage();
    this.messageList = this.messageService.messages;

    this.messageList
    .subscribe(
      (messages: Array<Message>) => {
        setTimeout(() => {
          this.scrollToBottom();
        });
      });
  }

  private scrollToBottom() {
    const scrollPane: any = this.el
            .nativeElement.querySelector('.msg-container');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

  private receiveSlackMessage() {
    this.connection = this.chatservice.getMessages().subscribe(message => {
      const MESSAGE: Message = new Message(++this.counter, message['username'], message['message'], false);
      this.messageService.addMessage(MESSAGE);
    });
  }

  private openDialog() {
    setTimeout( () => {const DIALOG_REF: MatDialogRef<UserNameDialogComponent> = this.dialog.open(UserNameDialogComponent, {
      width: '250px'
    });

    DIALOG_REF.afterClosed().subscribe((result) => {
      this.username = result;
      });
    }, 0);
  }

  sentMessage(message: string) {
    const MESSAGE: Message = new Message(++this.counter, this.username, message, true);
    this.messageService.addMessage(MESSAGE);
    this.chatservice.sendMessage(message, this.username);
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
