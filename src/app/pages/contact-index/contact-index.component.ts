import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { finalize, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'contact-index',
  standalone: false,

  templateUrl: './contact-index.component.html',
  styleUrl: './contact-index.component.scss'
})
export class ContactIndexComponent {
  // contacts$: Observable<Contact[]>
  selectedContactId: string | null = null

  private contactService = inject(ContactService)
  // private loaderService = inject(LoaderService)
  private destroyRef = inject(DestroyRef)
  contacts$ = this.contactService.contacts$

  // constructor(private contactService: ContactService) {
  //   this.contacts$ = this.contactService.contacts$;
  // }

  onRemoveContact(contactId: string) {
    // this.loaderService.setIsLoading(true)
    this.contactService.deleteContact(contactId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        // finalize(() => this.loaderService.setIsLoading(false))
      )
      .subscribe({
        error: err => console.log('err:', err),
      })
  }

  ngOnDestroy(): void {

  }
}


