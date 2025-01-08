import { Component, inject, Input, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-details-page',
  standalone: false,

  templateUrl: './contact-details-page.component.html',
  styleUrl: './contact-details-page.component.scss'
})
export class ContactDetailsPageComponent implements OnInit {
  private contactService = inject(ContactService)
  contacts: Contact[] | null = null
  firstContact: Contact | null = null
  // @Input() contact!:Contact
  // firstContact = this.contacts[0]

  ngOnInit(): void {
    this.contactService.contacts$
      .subscribe({
        next: (contacts) => {
          this.contacts = contacts
          if (contacts && contacts.length > 0) {
            this.firstContact = contacts[0]
          }
        },
        error: (err) => {
          console.error('Error fetching contacts:', err);
        }
      })
  }
}
