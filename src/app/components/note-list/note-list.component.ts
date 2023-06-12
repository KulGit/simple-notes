import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from 'src/app/interfaces/note.interface';
import { ModalService } from 'src/app/services/modal.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteListComponent implements OnInit {

  public notes$!: Observable<Note[]>;

  public noteTitle!: string;
  public noteText!: string;
  public noteDate!: string;

  public isAscending: boolean = false;


  constructor(
    private service: NotesService,
    public modalService: ModalService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.notes$ = this.service.getAllNotes()
  }

  public deleteNote(note: Note) {
    let nodeId = this.service.getNoteId(note);
    this.service.deleteNote(nodeId);
    this.cd.detectChanges();
  }

  public showNote(note: Note) {
    this.noteTitle = note.title;
    this.noteText = note.text;
    this.noteDate = note.date;
    this.modalService.open()
  }

  public closeNote(): void {
    this.modalService.close()
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
