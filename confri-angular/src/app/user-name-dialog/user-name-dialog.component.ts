import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-name-dialog',
  templateUrl: './user-name-dialog.component.html',
  styleUrls: ['./user-name-dialog.component.css']
})
export class UserNameDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserNameDialogComponent>) { }

  ngOnInit() {
  }

  closeDialog(text: String) {
    this.dialogRef.close(text);
  }
}
