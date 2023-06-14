import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() text!: string;
  @Output() click: EventEmitter<void> = new EventEmitter<void>;
  
  public onClick(): void {
    this.click.emit()
  }
}
