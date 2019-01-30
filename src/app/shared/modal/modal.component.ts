import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-modal-window',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
    opened = false;
    size: string;

    @Input() title: string;
    @Input() text: string;
    @Input() open: boolean;
    @Input() showCancelButton: boolean;
    @Input() submitButtonText: string;
    @Output() confirm = new EventEmitter<Boolean>();
    @Output() hideModal = new EventEmitter<Boolean>();

    constructor() { }

    ngOnInit() {
    }


    cancel() {
        this.open = false;
        this.hideModal.emit(true);
    }

    modalAction() {
        this.confirm.emit(true);
        this.open = false;
    }
}
