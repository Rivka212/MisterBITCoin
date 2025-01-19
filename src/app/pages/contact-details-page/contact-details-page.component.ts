import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'contact-details-page',
  standalone: false,

  templateUrl: './contact-details-page.component.html',
  styleUrl: './contact-details-page.component.scss'
})
export class ContactDetailsPageComponent implements OnInit {

  private contactService = inject(ContactService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  @Input() contactId!: string
  // @Output() onBack = new EventEmitter()
  contact$!: Observable<Contact>

  // constructor(private contactService: ContactService) { }

  ngOnInit() {
    console.log('contactId:', this.contactId);
    this.contact$ = this.route.params.pipe(
      switchMap(params => this.contactService.getContactById(params['contactId']))
    )
  }
  onBack(){
    this.router.navigateByUrl('/contact')
  }

}

