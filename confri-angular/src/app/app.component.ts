import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import 'rxjs/add/operator/map';

import {UserNameDialogComponent} from './user-name-dialog/user-name-dialog.component';
import {Message} from './model/message.model';

import {ChatService} from './service/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  private counter:number;
  username: String;
  messages: Message[];
  connection;

  constructor(public dialog: MatDialog, private chatservice: ChatService) {}

  ngOnInit() {
    this.counter = 0;
    this.messages = [];
    this.openDialog();
    this.receiveSlackMessage();
  }

  private receiveSlackMessage() {
    this.connection = this.chatservice.getMessages().subscribe(message => {
      const MESSAGE: Message = new Message(++this.counter, message['username'], message['message'], false);
      this.messages.push(MESSAGE); 
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

  postMessages(message: String) {
    const MESSAGE: Message = new Message(++this.counter, this.username, message, true);
    this.messages.push(MESSAGE);
    this.chatservice.sendMessage(message, this.username);
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  // makeBackendRequest() {
    // this.http.get('http://localhost:8080/getData')
    //         .map( (data) => data)
    //         .subscribe(data => console.log(data));
  // }
}
