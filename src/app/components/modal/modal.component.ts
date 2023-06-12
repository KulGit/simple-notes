import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() isOpen!: boolean | null;
  @Input() title!: string;
  @Input() text!: string;
  @Input() date!: string;

  @Output() close: EventEmitter<void> = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  public onClose(): void {
    this.close.emit()
  }
}
