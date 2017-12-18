import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
 
import { AppComponent } from './app.component';
import { UserNameDialogComponent } from './user-name-dialog/user-name-dialog.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { FromNowPipe } from './pipes/from-now.pipe';


@NgModule({
  declarations: [
    AppComponent,
    UserNameDialogComponent,
    ChatWindowComponent,
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
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
