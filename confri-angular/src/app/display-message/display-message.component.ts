import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IfcMessage } from '../core/confri.state';

@Component({
    selector: 'display-message',
    templateUrl: './display-message.component.html',
    styleUrls: ['./display-message.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayMessageComponent {
    @Input() messages: IfcMessage[];
}