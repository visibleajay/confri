import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {Observable} from 'rxjs';
import { NgRedux, select } from '@angular-redux/store';

import { UserNameDialogComponent } from './user-name-dialog/user-name-dialog.component';

import { ConfriActions } from './core/confri.actions';
import { IfcMessage } from './core/confri.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private username: string;
  @select() messageList$: Observable<IfcMessage[]>;

  constructor(public dialog: MatDialog,
              public confriActions: ConfriActions) {}

  ngOnInit() {
    this.openDialog();
  }

  // private scrollToBottom() {
  //   const scrollPane: any = this.el
  //           .nativeElement.querySelector('.msg-container');
  //   scrollPane.scrollTop = scrollPane.scrollHeight;
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
  }
}
