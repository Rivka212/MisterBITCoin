import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-index',
  standalone: false,

  templateUrl: './contact-index.component.html',
  styleUrl: './contact-index.component.scss'
})
export class ContactIndexComponent implements OnInit {
  private contactService = inject(ContactService)
  contacts: Contact[] | null = null

  ngOnInit(): void {
    this.contactService.contacts$
      .subscribe({
        next: contacts => this.contacts = contacts
      })
  }
}
