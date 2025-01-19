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
import { FormsModule } from '@angular/forms';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { ChartComponent } from './cmps/chart/chart.component';
// import { Ng2ChartsModule } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
// import { ChartsModule } from 'ng2-charts'; 
@NgModule({
  declarations: [
    AppComponent,
    ContactIndexComponent,
    HomePageComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactDetailsPageComponent,
    ContactFilterComponent,
    StatisticComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // NgChartsModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
