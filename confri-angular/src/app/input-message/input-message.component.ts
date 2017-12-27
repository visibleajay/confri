
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'input-message',
    templateUrl: './input-message.component.html'
})
export class InputMessageComponent {
    @Output() enterMessage = new EventEmitter<string>();
}