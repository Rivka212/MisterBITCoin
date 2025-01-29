import { Component, DestroyRef, inject } from '@angular/core';
import { filter, map, Observable, switchMap } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';
import { Move } from '../../models/move.model';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'home-page',
  standalone: false,

  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  user$: Observable<User | null>
  BTC$: Observable<string>
  userMoves$: Observable<Move[]>

  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService,
    private msgService: MsgService,
  ) {
    this.user$ = this.userService.loggedInUser$

    this.userMoves$ = this.user$.pipe(
      filter(user => !!user),
      map(user => user.moves.slice(0, 3)),
    )

    this.BTC$ = this.user$.pipe(
      filter(user => !!user),
      switchMap(user => this.bitcoinService.getRateStream(user.coins)),
    )
  }
  destroyRef = inject(DestroyRef)
 
  onAddMoveDemo() {
    const contact = {
      "_id": "5a566402abb3146207bc4ec5",
      "name": "Floyd Rutledge",
      "email": "floydrutledge@renovize.com",
      "phone": "+1 (807) 597-3629"
    }

    const amount = Math.ceil(Math.random() * 10)
    this.userService.addMove(contact, amount)
      .subscribe({
        next: () => {
          this.msgService.setSuccessMsg(`Transferred ${amount} coins to ${contact.name}`)
        },
        error: (err) => {
          this.msgService.setErrorMsg(`Error while transferring coins`)

        }
      })
  }
}
