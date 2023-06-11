import { Inject, Injectable } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = new Array<Note>;
  
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public addNote(note: Note) {
    let length = this.notes.push(note)
    this.storage.set('notes', this.notes)
    let index = length - 1;
    return index;
  }

  public getAllNotes() {
    this.notes = this.storage.get('notes')
    return this.notes;
  }

  public getNoteId(note: Note) {
    return this.notes.indexOf(note);
  }

  public deleteNote(id: number) {
    let notes = this.storage.get('notes');
    notes.splice(id, 1);
    this.storage.set('notes', notes);
    this.notes.splice(id, 1);
  }

  public sortNotes(isAscending:boolean) {
    if (isAscending) {
      this.notes.sort((a,b) => a.text.localeCompare(b.text))
    } else {
      this.notes.sort((a,b) => b.text.localeCompare(a.text))
    }
  }

  public getFormattedDate(): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    return new Date().toLocaleDateString('en-US', options).replace('at', '');
  }

  public sortByDates(isAscending: boolean) {
    this.notes.sort((a,b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return isAscending ? (dateA.getTime() - dateB.getTime()) : (dateB.getTime() - dateA.getTime())
    })
  }

}
