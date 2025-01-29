import { Component } from '@angular/core';
import { take } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signup',
  standalone: false,
  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  userName = '';
    
  constructor(
      private userService: UserService,
      private router: Router
  ) { }

  signUp(): void {
      this.userService.signup(this.userName)
          .pipe(take(1))
          .subscribe(() => {
              this.router.navigate(['/']);
          });

  }
}

