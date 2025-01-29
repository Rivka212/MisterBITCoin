import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ContactIndexComponent } from './pages/contact-index/contact-index.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { ChartComponent } from './cmps/chart/chart.component';
// import { Ng2ChartsModule } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { MoveListComponent } from './cmps/move-list/move-list.component';
import { TransferFundComponent } from './cmps/transfer-fund/transfer-fund.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { MsgComponent } from './cmps/msg/msg.component';
// import { ChartsModule } from 'ng2-charts'; 
@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    ContactIndexComponent,
    HomePageComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactDetailsPageComponent,
    ContactFilterComponent,
    StatisticComponent,
    ChartComponent,
    ContactEditComponent,
    MoveListComponent, 
    TransferFundComponent,
    SignupComponent,
    MsgComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // NgChartsModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
