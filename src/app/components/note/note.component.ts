import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: NotesService
    ) { }

  form!: FormGroup;

  ngOnInit(): void {
    this.formInit();
  }

  public formInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      date: ['']
    })
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.form.controls['date'].setValue(this.service.getFormattedDate());
      this.service.addNote(this.form.value)
      this.router.navigate(['/'])
    }
  }

}
