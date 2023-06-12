import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private isOpenModal: Subject<boolean> = new Subject<boolean>()

  isOpen$ = this.isOpenModal.asObservable()

  constructor() { }

  public open(): void {
    this.isOpenModal.next(true)
  }

  public close(): void {
    this.isOpenModal.next(false)
  }
}
