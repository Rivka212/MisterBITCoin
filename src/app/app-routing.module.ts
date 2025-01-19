import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactIndexComponent } from './pages/contact-index/contact-index.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';

const routes: Routes = [
 { path:'home', component: HomePageComponent},
 { path:'contact', component: ContactIndexComponent},
 { path:'chart', component: StatisticComponent},
 { path:'contact/:contactId', component: ContactDetailsPageComponent},
 { path:'', pathMatch:'full', redirectTo:'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
