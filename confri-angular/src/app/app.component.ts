import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import 'rxjs/add/operator/map';

import {UserNameDialogComponent} from './user-name-dialog/user-name-dialog.component';
import {Message} from './chat-window/chat-window.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  name: String;
  messages: Message[];
  constructor(public dialog: MatDialog, public http: Http) {}

  ngOnInit() {
    setTimeout( () => {const DIALOG_REF: MatDialogRef<UserNameDialogComponent> = this.dialog.open(UserNameDialogComponent, {
        width: '250px',
        data: {name: this.name}
      });

      DIALOG_REF.afterClosed().subscribe((result) => {
        this.name = result;
      });
    }, 0);

    this.messages = [{
      id: 1,
      user: 'Ajay',
      text: 'Rocking on,',
      sentAt: new Date(),
      sender: true
    }, {
      id: 1,
      user: 'LiveRock',
      text: 'love you,',
      sentAt: new Date(),
      sender: false
    }, {
      id: 1,
      user: 'Ajay',
      text: 'Rocking on,',
      sentAt: new Date(),
      sender: true
    }, {
      id: 1,
      text: 'loving,',
      user: 'LiveRock',
      sentAt: new Date(),
      sender: false
    }];
  }

  makeBackendRequest() {
    this.http.get('http://localhost:8080/getData')
            .map( (data) => data)
            .subscribe(data => console.log(data));
  }
}
