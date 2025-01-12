import { User } from "../models/user.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = {
    "name": "Ochoa Hyde",
    "coins": 145,
    "moves": []
  }
  user2: User = {
    "name": "Hallie Mclean",
    "coins": 72,
    "moves": []
  }
  user3: User = {
    "name": "Parsons Norris",
    "coins": 158,
    "moves": []
  }

  getUser() {
    return this.user
  }

  private _user$ = new BehaviorSubject<User>(this.user)
  public user$ = this._user$.asObservable()

  getLoggedInUser(): User {
    return this._user$.value
  }

  changeLoggedInUser() {
    this._user$.next(this.user2)
  }
}

