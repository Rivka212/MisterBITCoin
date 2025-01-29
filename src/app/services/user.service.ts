import { User } from "../models/user.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject, from, map, Observable, of, switchMap, tap, throwError } from "rxjs";
import { storageService } from "./async-storage.service";
import { Contact } from "../models/contact.model";
import { Move } from "../models/move.model";
import { utilService } from "./storage.service";

const ENTITY= 'user'
const ENTITY_LOGGEDIN_USER = 'loggedinUser'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
    const users = JSON.parse(localStorage.getItem(ENTITY)!)
    if (!users || users.length === 0) {
        localStorage.setItem(ENTITY, JSON.stringify([]))
    }
}

private _loggedInUser$ = new BehaviorSubject<User | null>(utilService.loadFromSession(ENTITY_LOGGEDIN_USER));
public loggedInUser$ = this._loggedInUser$.asObservable();

public signup(name: string) {
    return from(storageService.query<User>(ENTITY)).pipe(
        map(users => users.find(_user => _user.name === name)),
        switchMap(user => user
            ? of(user)
            : from(storageService.post(ENTITY, this._createUser(name) as User))
        ),
        tap(user => this._saveLocalUser(user))
    )
}

public logout() {
    return of(null).pipe(
        tap(() => this._saveLocalUser(null))
    )
}

public addMove(contact: Contact, amount: number): Observable<void> {
    if (!amount) return of()
      // public addMove(contact: Contact, amount: number) {
      // if (!amount) return of(null)
    const loggedInUser = { ...this.getLoggedInUser() }
    if (loggedInUser.coins < amount) return throwError(() => 'Not enough coins!')
    const newMove = this._createMove(contact, amount)
    loggedInUser.coins -= amount
    loggedInUser.moves.unshift(newMove)
    return from(storageService.put(ENTITY, loggedInUser)).pipe(
        tap(() => this._saveLocalUser(loggedInUser)),
        map(() => {}), 

    )
}

//  getLoggedInUser(): User {
//         return this._loggedInUser$.value
//     }

getLoggedInUser(): User {
  const user = this._loggedInUser$.value;
  if (user === null) {
    throw new Error("No logged-in user found");
  }
  return user;
}


    _createUser(name: string): Partial<User> {
        return {
            name,
            coins: 100,
            moves: []
        }
    }

    _createMove(contact: Contact, amount: number): Move {
        return {
            toId: contact._id,
            to: contact.name,
            at: Date.now(),
            amount
        }
    }

    _saveLocalUser(user: User | null) {
        this._loggedInUser$.next(user && { ...user });
        utilService.saveToSession(ENTITY_LOGGEDIN_USER, user)
    }

  // user: User = {
  //   "name": "Ochoa Hyde",
  //   "coins": 145,
  //   "moves": []
  // }
  // user2: User = {
  //   "name": "Hallie Mclean",
  //   "coins": 72,
  //   "moves": []
  // }
  // user3: User = {
  //   "name": "Parsons Norris",
  //   "coins": 158,
  //   "moves": []
  // }

  // getUser() {
  //   return this.user
  // }

  // private _user$ = new BehaviorSubject<User>(this.user)
  // public user$ = this._user$.asObservable()

  // getLoggedInUser(): User {
  //   return this._user$.value
  // }

  // changeLoggedInUser() {
  //   this._user$.next(this.user2)
  // }

}
