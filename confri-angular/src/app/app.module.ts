import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatInputModule, MatButtonModule, MatCardModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { UserNameDialogComponent } from './user-name-dialog/user-name-dialog.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { InputMessageComponent } from './input-message/input-message.component';
import { DisplayMessageComponent } from './display-message/display-message.component';

import { FromNowPipe } from './pipes/from-now.pipe';


import {ChatService} from './service/chat.service';
import {MessagesService} from './service/message.service';

@NgModule({
  declarations: [
    AppComponent,
    UserNameDialogComponent,
    ChatWindowComponent,
    InputMessageComponent,
    DisplayMessageComponent,
    FromNowPipe
  ],
  entryComponents: [
    UserNameDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatListModule
  ],
  providers: [ChatService, MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
