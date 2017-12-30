import { Component, Input } from '@angular/core';
import { IfcMessage } from '../core/confri.state';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent {
  @Input() message: IfcMessage;
}
