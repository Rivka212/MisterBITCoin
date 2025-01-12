import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'contact-details-page',
  standalone: false,

  templateUrl: './contact-details-page.component.html',
  styleUrl: './contact-details-page.component.scss'
})
export class ContactDetailsPageComponent implements OnInit {

    @Input() contactId!: string
    @Output() onBack = new EventEmitter()
    contact$!: Observable<Contact>

    constructor(private contactService: ContactService) { }

    ngOnInit() {
        this.contact$ = this.contactService.getContactById(this.contactId)
    }
}
