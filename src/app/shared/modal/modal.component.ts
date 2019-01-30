import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-modal-window',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    @Input() title: string;
    @Input() text: string;
    @Input() open: boolean;
    @Input() showCancelButton = true;
    @Input() submitButtonText: string;
    @Output() confirm = new EventEmitter<Boolean>();
    @Output() cancel = new EventEmitter<Boolean>();

    constructor() { }

    ngOnInit() {
        
    }

    onCancel() {
        this.open = !this.open;
        this.cancel.emit(true);
    }

    onConfirm() {
        this.open = !this.open;
        this.confirm.emit(true);
    }
}
