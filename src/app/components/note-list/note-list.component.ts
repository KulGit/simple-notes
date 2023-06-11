import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/interfaces/note.interface';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  notes: Note[] = new Array<Note>;

  public isAscending: boolean = false;

  constructor(
    private service: NotesService
  ) { }

  ngOnInit(): void {
    this.notes = this.service.getAllNotes()
  }

  public deleteNote(note: Note) {
    let nodeId = this.service.getNoteId(note);
    this.service.deleteNote(nodeId);
  }

  public sortByTitle(): void {
   this.isAscending = !this.isAscending;
   this.service.sortNotes(this.isAscending);
  }

  public sortByDate(): void {
    this.isAscending = !this.isAscending;
    this.service.sortByDates(this.isAscending);
  }
}
