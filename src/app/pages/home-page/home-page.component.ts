import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';

@Component({
  selector: 'home-page',
  standalone: false,

  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  

  // user$: Observable<User> = this.userService.user$
  // BTC$ = this.user$.pipe(
  //   switchMap(user => this.bitcoinService.getRate(user.coins))
  // )

  onChangeUser() {
    this.userService.changeLoggedInUser()
}

constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService
) { }

}