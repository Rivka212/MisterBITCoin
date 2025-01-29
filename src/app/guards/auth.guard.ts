import { CanActivateFn, Router } from '@angular/router';
import { MsgService } from '../services/msg.service';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const msgService = inject(MsgService)

  return inject(UserService).loggedInUser$.pipe(
    map(user => {
      if (!user) {
        msgService.setErrorMsg('Not authorize!')
        return router.createUrlTree(['/signup'])
      }
      return true
    })
  )
};
