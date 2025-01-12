import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'contact-index',
  standalone: false,

  templateUrl: './contact-index.component.html',
  styleUrl: './contact-index.component.scss'
})
export class ContactIndexComponent  {
 contacts$: Observable<Contact[]>
  selectedContactId: string | null = null


  constructor(private contactService: ContactService) {
   this.contacts$  = this.contactService.contacts$;
   }
  // contacts$: Observable<Contact[]> = this.contactService.contacts$;
  // selectedContactId: string | null = null


  // constructor(private contactService: ContactService) { }
}
