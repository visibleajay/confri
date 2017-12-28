import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {Observable} from 'rxjs';
import { NgRedux, select } from '@angular-redux/store';
import 'rxjs/add/operator/map';

import { UserNameDialogComponent } from './user-name-dialog/user-name-dialog.component';
// import { Message } from './model/message.model';

import { ChatService } from './service/chat.service';
import { MessagesService } from './service/message.service';

import { ConfriActions } from './core/confri.actions';
import { IfcMessage } from './core/confri.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private counter:number;
  username: String;
  @select() messageList$: Observable<IfcMessage[]>;
  // connection;

  constructor(public dialog: MatDialog,
              // private el: ElementRef,
              // private messageService: MessagesService, 
              // private chatservice: ChatService,
              public confriActions: ConfriActions) {}

  ngOnInit() {
    this.counter = 0;
    this.openDialog();
    // this.receiveSlackMessage();
    // this.messageList = this.messageService.messages;

    // this.messageList
    // .subscribe(
    //   (messages: Array<Message>) => {
    //     setTimeout(() => {
    //       this.scrollToBottom();
    //     });
    //   });
  }

  // private scrollToBottom() {
  //   const scrollPane: any = this.el
  //           .nativeElement.querySelector('.msg-container');
  //   scrollPane.scrollTop = scrollPane.scrollHeight;
  // }

  // private receiveSlackMessage() {
  //   this.connection = this.chatservice.getMessages().subscribe(message => {
  //     const MESSAGE: Message = new Message(++this.counter, message['username'], message['message'], false);
  //     this.messageService.addMessage(MESSAGE);
  //   });
  // }

  private openDialog() {
    setTimeout( () => {const DIALOG_REF: MatDialogRef<UserNameDialogComponent> = this.dialog.open(UserNameDialogComponent, {
      width: '250px'
    });

    DIALOG_REF.afterClosed().subscribe((result) => {
      this.confriActions.username(result);
      this.username = result;
      });
    }, 0);
  }

  sentMessage(message: string) {
    const MESSAGE: IfcMessage = {
      id: ConfriActions.COUNTER++,
      text: message,
      incoming: false,
      sender: this.username,
      time: new Date(),
      state: 'pending'

    };
    this.confriActions.postMessage(MESSAGE);
    // const MESSAGE: Message = new Message(++this.counter, this.username, message, true);
    // this.messageService.addMessage(MESSAGE);
    // this.chatservice.sendMessage(message, this.username);
  }

  // ngOnDestroy() {
  //   this.connection.unsubscribe();
  // }
}
