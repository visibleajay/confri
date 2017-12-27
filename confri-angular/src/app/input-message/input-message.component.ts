
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'input-message',
    templateUrl: './input-message.component.html',
    styles: [`
                .parentHeightDimensions {
                    height: 100%;
                }

            `]
})
export class InputMessageComponent {
    @Output() enterMessage = new EventEmitter<string>();
}