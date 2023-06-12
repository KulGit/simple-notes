import { Component, OnInit } from '@angular/core';
import { NotesService } from './services/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-notes';

  constructor( private service: NotesService){}

  ngOnInit(): void {
    
    window.addEventListener('message', (event) => {
      const message = event.data;
      if (message && message.key === this.service.storageKey) {
        const newState = JSON.parse(message.value);
      }
    });



  }
}
