import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-preview',
  standalone: false,

  templateUrl: './contact-preview.component.html',
  styleUrl: './contact-preview.component.scss'
})
export class ContactPreviewComponent implements OnInit {

  @Input() contact!: Contact
  @Output() onSelect = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  onSelectContact() {
    this.onSelect.emit(this.contact._id)
  }
}
// export class ContactPreviewComponent {
// @Input() contact!:Contact
// }
