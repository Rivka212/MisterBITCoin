import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, from, tap, retry, catchError, take } from 'rxjs';
import { Contact } from '../models/contact.model';
import { storageService } from './async-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ContactFilter } from '../models/contact.filter';

const ENTITY = 'contacts'

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    private _contacts$ = new BehaviorSubject<Contact[]>([])
    public contacts$ = this._contacts$.asObservable()

    private _contactFilter$ = new BehaviorSubject<ContactFilter>({term:''})
    public contactFilter$ = this._contactFilter$.asObservable()


    constructor() {
        // Handling Demo Data, fetching from storage || saving to storage 
        const contacts = JSON.parse(localStorage.getItem(ENTITY) || 'null')
        if (!contacts || contacts.length === 0) {
            localStorage.setItem(ENTITY, JSON.stringify(this._createContacts()))
        }
    }

    public loadContacts() {
        return from(storageService.query<Contact>(ENTITY))
            .pipe(
                tap(contacts => {
                    const filterBy = this._contactFilter$.value
                    // const termRegex = new RegExp(filterBy.term, 'i')
                    // contacts = contacts.filter(contact => termRegex.test(contact.name))
                    // this._contacts$.next(contacts)
                    if (filterBy && filterBy.term) {
                        contacts = this._filter(contacts, filterBy.term)
                    }
                    contacts = contacts.filter(contact => contact.name.toLowerCase().includes(filterBy.term.toLowerCase()))
                    this._contacts$.next(this._sort(contacts))
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    public setFilterBy(filterBy: ContactFilter) {
        this._contactFilter$.next(filterBy)
        this.loadContacts().pipe(take(1)).subscribe()
    }

    public getContactById(id: string): Observable<Contact> {
        console.log(id);
        return from(storageService.get<Contact>(ENTITY, id))
            .pipe(catchError(err => throwError(() => `Contact id ${id} not found!`)))
    }

    public getEmptyContact():Partial<Contact> {
        return {name:'', phone:'', email:''}
    }

    public removeContact(id: string) {
        return from(storageService.remove(ENTITY, id))
            .pipe(
                tap(() => {
                    let contacts = this._contacts$.value
                    contacts = contacts.filter(contact => contact._id !== id)
                    this._contacts$.next(contacts)
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    public saveContact(contact: Contact) {
        return contact._id ? this._updateContact(contact) : this._addContact(contact)
    }

    private _updateContact(contact: Contact) {
        return from(storageService.put<Contact>(ENTITY, contact))
            .pipe(
                tap(updatedContact => {
                    const contacts = this._contacts$.value
                    this._contacts$.next(contacts.map(contact => contact._id === updatedContact._id ? updatedContact : contact))
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    private _addContact(contact: Contact) {
        return from(storageService.post(ENTITY, contact))
            .pipe(
                tap(newContact => {
                    const contacts = this._contacts$.value
                    this._contacts$.next([...contacts, newContact])
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    private _sort(contacts: Contact[]): Contact[] {
        return contacts.sort((a, b) => {
            if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
                return -1;
            }
            if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
                return 1;
            }
            return 0;
        })
    }

    private _filter(contacts: Contact[], term: string) {
        term = term.toLocaleLowerCase()
        return contacts.filter(contact => {
            return contact.name.toLocaleLowerCase().includes(term) ||
                contact.phone.toLocaleLowerCase().includes(term) ||
                contact.email.toLocaleLowerCase().includes(term)
        })
    }

    private _createContacts() {
        const contacts = [
            {
                "_id": "4b32ca",
                "name": "Ochoa Hyde",
                "email": "ochoahyde@renovize.com",
                "phone": "+1 (968) 593-3824"
            },
            {
                "_id": "a99fde",
                "name": "Hallie Mclean",
                "email": "halliemclean@renovize.com",
                "phone": "+1 (948) 464-2888"
            },
            {
                "_id": "83d319",
                "name": "Parsons Norris",
                "email": "parsonsnorris@renovize.com",
                "phone": "+1 (958) 502-3495"
            },
            {
                "_id": "b47b4d",
                "name": "Rachel Lowe",
                "email": "rachellowe@renovize.com",
                "phone": "+1 (911) 475-2312"
            },
            {
                "_id": "e4699d",
                "name": "Dominique Soto",
                "email": "dominiquesoto@renovize.com",
                "phone": "+1 (807) 551-3258"
            },
            {
                "_id": "a9220a",
                "name": "Shana Pope",
                "email": "shanapope@renovize.com",
                "phone": "+1 (970) 527-3082"
            },
            {
                "_id": "f990db",
                "name": "Faulkner Flores",
                "email": "faulknerflores@renovize.com",
                "phone": "+1 (952) 501-2678"
            },
            {
                "_id": "0ffbdf",
                "name": "Holder Bean",
                "email": "holderbean@renovize.com",
                "phone": "+1 (989) 503-2663"
            },
        ];
        return contacts
    }

    private _handleError(err: HttpErrorResponse) {
        console.log('err:', err)
        return throwError(() => err)
    }
}

function _getRandomId(length = 8): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            characters.length));
    }
    return result;
}
