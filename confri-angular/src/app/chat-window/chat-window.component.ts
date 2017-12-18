import { Component, OnInit, Input } from '@angular/core';

export interface Message {
  id: number;
  user: String;
  text: String;
  sentAt: Date;
  sender: Boolean;
};

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  @Input() message: Message;
  
  constructor() { }

  ngOnInit() {
  }

}
