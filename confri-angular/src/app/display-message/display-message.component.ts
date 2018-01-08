import { Component, Input, ChangeDetectionStrategy, ElementRef, OnChanges } from '@angular/core';
import { IfcMessage } from '../core/confri.state';

@Component({
    selector: 'display-message',
    templateUrl: './display-message.component.html',
    styleUrls: ['./display-message.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayMessageComponent implements OnChanges{
    @Input() messages: IfcMessage[];

    constructor(public el: ElementRef){}

    ngOnChanges() {
        this.scrollToBottom();
    }

    private scrollToBottom() {
        const scrollPane: any = this.el
                .nativeElement.querySelector('.msg-container');
        scrollPane.scrollTop = scrollPane.scrollHeight;
    }
}