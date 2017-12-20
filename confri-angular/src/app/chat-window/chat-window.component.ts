import { Component, OnInit, Input } from '@angular/core';
import {Message} from '../model/message.model';

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
