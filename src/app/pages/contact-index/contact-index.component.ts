import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { finalize, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'contact-index',
  standalone: false,

  templateUrl: './contact-index.component.html',
  styleUrl: './contact-index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ContactIndexComponent implements OnInit {
  
  contacts$: Observable<Contact[]>

  constructor(
    private contactService: ContactService,
    private msgService: MsgService
  ) {
    this.contacts$ = this.contactService.contacts$;
  }

  ngOnInit(): void {
    this.contacts$ = this.contactService.contacts$
  }

  onRemoveContact(contactId: string) {
    this.contactService.deleteContact(contactId).subscribe({
      error: err => this.msgService.setErrorMsg(err.message)
    })
  }

  // onRemoveContact(contactId: string) {
  //   this.contactService.deleteContact(contactId)
  //     .pipe(
  //       takeUntilDestroyed(this.destroyRef),
  //     )
  //     .subscribe({
  //       error: err => console.log('err:', err),
  //     })
  // }


}


