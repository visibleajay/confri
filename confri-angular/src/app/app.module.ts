import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatInputModule, MatButtonModule, MatCardModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { UserNameDialogComponent } from './user-name-dialog/user-name-dialog.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { InputMessageComponent } from './input-message/input-message.component';
import { DisplayMessageComponent } from './display-message/display-message.component';

import { FromNowPipe } from './pipes/from-now.pipe';

import {ChatService} from './service/chat.service';
import {MessagesService} from './service/message.service';

import { rootReducer, IfcConfriState, INITIAL_CONFRI_STATE } from './core/confri.state';
import { ConfriActions } from './core/confri.actions';

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
    MatListModule,
    NgReduxModule
  ],
  providers: [ChatService, MessagesService, ConfriActions],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(ngRedux: NgRedux<IfcConfriState>,
              devTools: DevToolsExtension) {

    const storeEnhancers = devTools.isEnabled() ? 
                            [ devTools.enhancer() ] :
                              [];
    ngRedux
      .configureStore(
            rootReducer,
            INITIAL_CONFRI_STATE,
            [],
            storeEnhancers
      );
  }
}
