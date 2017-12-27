import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Message } from '../model/message.model';

@Component({
    selector: 'display-message',
    templateUrl: './display-message.component.html',
    styleUrls: ['./display-message.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayMessageComponent {
    @Input() messages: Message[];
}