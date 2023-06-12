import { Inject, Injectable } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public notes: Note[] = new Array<Note>;

  public stateSubject = new BehaviorSubject<any>([]);

  public storageKey = 'notes';
  public isLocalStorageUpdated = false;

  constructor( @Inject(LOCAL_STORAGE) private storage: StorageService) {
    const storeState = this.storage.get('notes');
    if (storeState) {
      this.stateSubject.next(storeState)
    }
  }

  public addNote(note: Note) {
    if (!this.notes) {
      this.notes = [];
    }
    this.notes.push(note);
    this.storage.set('notes', this.notes);
    this.stateSubject.next(this.notes);
    this.isLocalStorageUpdated = true;

    window.postMessage({ key: this.storageKey, value: JSON.stringify(note) }, '*');
  }

  public getAllNotes() {
    this.notes = this.storage.get('notes');
    return this.stateSubject.asObservable();
  }

  public getNoteId(note: Note) {
    return this.notes.findIndex(n => n.title === note.title)
  }

  public deleteNote(id: number) {
    let notes = this.storage.get('notes');
    notes.splice(id, 1);
    this.storage.set('notes', notes);
    this.notes.splice(id, 1);
    this.stateSubject.next(this.notes);
    this.isLocalStorageUpdated = true;

    window.postMessage({ key: this.storageKey, value: JSON.stringify(notes) }, '*');
  }

  public sortNotes(isAscending:boolean) {
    if (isAscending) {
      this.notes.sort((a,b) => a.text.localeCompare(b.text))
    } else {
      this.notes.sort((a,b) => b.text.localeCompare(a.text))
    }
    this.stateSubject.next(this.notes);
  }

  public getFormattedDate(): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };

    return new Date().toLocaleDateString('en-US', options).replace('at', '');
  }

  public sortByDates(isAscending: boolean) {
    this.notes.sort((a,b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return isAscending ? (dateA.getTime() - dateB.getTime()) : (dateB.getTime() - dateA.getTime())
    })
    this.stateSubject.next(this.notes);
  }

  public getState() {
    const storeState = this.storage.get('notes');
    this.stateSubject.next(storeState);
  }
}
