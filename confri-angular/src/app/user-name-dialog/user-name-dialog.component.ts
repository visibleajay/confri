import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-name-dialog',
  templateUrl: './user-name-dialog.component.html',
  styleUrls: ['./user-name-dialog.component.css']
})
export class UserNameDialogComponent{

  constructor(public dialogRef: MatDialogRef<UserNameDialogComponent>) { }

  closeDialog(text: String) {
    this.dialogRef.close(text);
  }
}
