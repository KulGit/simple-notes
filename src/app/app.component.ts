import { Component, OnInit } from '@angular/core';
import { NotesService } from './services/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-notes';

  private messageHandler!:(event: MessageEvent) => void;

  constructor( private service: NotesService){}

  ngOnInit(): void {
    this.messageHandler = (event: MessageEvent) => {
      const message = event.data;
      if (message && message.key === this.service.storageKey) {
        this.service.getState();
      }
    }
    
    window.addEventListener('message', this.messageHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.messageHandler);
  }
}
