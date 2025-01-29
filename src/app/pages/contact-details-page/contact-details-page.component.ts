import { Component, DestroyRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { combineLatest, filter, map, Observable, Subscription, switchMap, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../services/user.service';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'contact-details-page',
  standalone: false,

  templateUrl: './contact-details-page.component.html',
  styleUrl: './contact-details-page.component.scss'
})
export class ContactDetailsPageComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private msgService = inject(MsgService);
  private destroyRef = inject(DestroyRef);
  private contactService = inject(ContactService);

  private subscription!: Subscription
  contact: Contact | null = null

  contact$: Observable<Contact> = this.route.data.pipe(map(data => data['contact']))
  user$ = this.userService.loggedInUser$

  contactMoves$ = combineLatest([this.user$, this.contact$]).pipe(
    filter(([user]) => !!user),
    map(([user, contact]) => user?.moves.filter(move => move.toId === contact._id)),
  )

  ngOnInit(): void {
    this.subscription = this.contact$.subscribe(contact => this.contact = contact)
  }

  onTransferCoins(amount: number) {
    if (this.contact) {
      this.userService.addMove(this.contact, amount)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.msgService.setSuccessMsg(`Transferred ${amount} coins to ${this.contact?.name}`)
          },
          error: (err) => console.log(err)
        })
    } else {
      this.msgService.setErrorMsg("Contact not found.");
    }
  }

  onBack() {
    this.router.navigateByUrl('/contact')
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onRemoveContact(contactId: string): void {
    this.contactService.deleteContact(contactId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe({
        next: () => {
          console.log('Contact removed successfully');
          this.router.navigate(['/contact']);
        },
        error: err => {
          console.error('Error deleting contact:', err);
        }
      })
  }
}




//   private contactService = inject(ContactService)
//   private route = inject(ActivatedRoute)
//   private router = inject(Router)

//   @Input() contactId!: string
//   // @Output() onBack = new EventEmitter()
//   contact$!: Observable<Contact>
//     private destroyRef = inject(DestroyRef)
//   ngOnInit() {
//     console.log('contactId:', this.contactId);
//     this.contact$ = this.route.params.pipe(
//       switchMap(params => this.contactService.getContactById(params['contactId']))
//     )
//   }
//   onBack(){
//     this.router.navigateByUrl('/contact')
//   }

// }

