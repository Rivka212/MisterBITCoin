import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})

export class AppHeaderComponent {

  loggedInUser$: Observable<User | null>

  constructor(
    private userService: UserService,
    private router: Router
  ) {

    // isLoggedIn = this.userService.loggedInUser$.pipe(map(user => !!user))
    this.loggedInUser$ = this.userService.loggedInUser$
  }
  onLogout() {
    this.userService.logout()
      .pipe(take(1))
      .subscribe({
        next: () => this.router.navigate(['/signup']),
        error: (err) => console.log('Error:', err),
      })
  }
}