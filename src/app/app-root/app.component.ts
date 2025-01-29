import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'MisterBITCoin';

  private contactService = inject(ContactService)
  private subscription!: Subscription

  coins = ''

  ngOnInit(): void {
    this.subscription = this.contactService.loadContacts()
    // this.contactService.loadContacts()
      .subscribe({
        error(err) {
          console.log('err', err);
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe
  }

}