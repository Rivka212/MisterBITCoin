import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactIndexComponent } from './pages/contact-index/contact-index.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { SignupComponent } from './pages/signup/signup.component';
import { contactResolver } from './services/contact-resolver';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  {
    path: 'contact', component: ContactIndexComponent, canActivate: [authGuard], children: [
      { path: 'edit', component: ContactEditComponent },
      { path: 'edit/:contactId', component: ContactEditComponent, resolve: { contact: contactResolver }, }
    ]
  },
  { path: 'chart', component: StatisticComponent, canActivate: [authGuard] },
  { path: 'contact/:contactId', component: ContactDetailsPageComponent, canActivate: [authGuard], resolve: { contact: contactResolver }, },
  { path: '',component:HomePageComponent, canActivate: [authGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [noAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
