import { Injectable, inject } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { delay } from 'rxjs'
// import { Contact } from '../models/contact.model'
import { ContactService } from './contact.service'

export function contactResolver(route: ActivatedRouteSnapshot) {
    const id = route.params['contactId']
    return inject(ContactService).getContactById(id).pipe(delay(10))
}