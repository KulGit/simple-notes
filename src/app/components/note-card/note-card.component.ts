import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements AfterViewInit {

  @Input() title!: string;
  @Input() text!: string;
  @Input() date!: string;
  
  @ViewChild('textNote') textNote!: ElementRef<HTMLElement>;
  @ViewChild('trancation') trancation!: ElementRef<HTMLElement>;

  public contentHeight!: number;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output('show') showEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor( private render: Renderer2) { }

  ngAfterViewInit(): void {

    this.contentHeight = this.textNote.nativeElement.scrollHeight;

    if (this.contentHeight > 20) {
      this.render.setStyle(this.trancation.nativeElement, 'display', 'block')
    } else {
      this.render.setStyle(this.trancation.nativeElement, 'display', 'none')
    }
  }

  public showDetails(): void {
    this.showEvent.emit();
  }

  public onDelete(): void {
    this.deleteEvent.emit();
  }

}
