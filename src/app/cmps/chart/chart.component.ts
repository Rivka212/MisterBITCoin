// import { Component, OnInit, ViewChild } from '@angular/core';
// import { Observable, Subscription } from 'rxjs';
// import { Trade } from '../../models/chart.model';
// import { BitcoinService } from '../../services/bitcoin.service';
// import { BaseChartDirective } from 'ng2-charts';
// import { ChartConfiguration, ChartData } from 'chart.js';


// @Component({
//   selector: 'chart',
//   standalone: false,

//   templateUrl: './chart.component.html',
//   styleUrl: './chart.component.scss',
//   // imports: [ChartHostComponent, MatButton, BaseChartDirective],
// })
// export class ChartComponent implements OnInit {
//   @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

//   public barChartOptions: ChartConfiguration<'bar'>['options'] = {
//     scales: {
//       x: {},
//       y: {
//         min: 10,
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//       },
//       // datalabels: {
//       //   anchor: 'end',
//       //   align: 'end',
//       // },
//     },
//   };
//   public barChartType = 'bar' as const;

//   public barChartData: ChartData<'bar'> = {
//     labels: [],
//     datasets: [
//       { data: [], label: 'Trade Volume' },
//       // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },

//       // { name: ['11/23/2021'], value: 494762556.34959996 },
//       // { name: '11/24/2021', value: 480199475.88900006 },
//       // { name: '11/25/2021', value: 332409438.7548 },
//       // { name: '11/26/2021', value: 289094884.176 },
//       // { name: '11/27/2021', value: 777492583.0165 },
//       // { name: '11/28/2021', value: 277078998.492 },
//       // { name: '11/29/2021', value: 252736299.37800002 },
//       // { name: '11/30/2021', value: 367826530.49249995 },
//       // { name: '12/1/2021', value: 522506214.22769994 },
//       // { name: '12/2/2021', value: 479668944.2496 },
//       // { name: '12/3/2021', value: 431885271.2832 }

//     ],
//   };


//   trades$!: Observable<Trade[]>
//   subscription!: Subscription

//   constructor(private bitcoinService: BitcoinService) { }

//   ngOnInit() {
//     this.trades$ = this.bitcoinService.getTradeVolume();

//     // this.trades$.subscribe(data => {
//       this.subscription = this.trades$.subscribe((data) => {
//       this.barChartData.labels = data.map(item => item.name)
//       this.barChartData.datasets[0].data = data.map(item => item.value)
//       if (this.chart) {
//         this.chart.update();
//       }
//     });
//   }

//    ngOnDestroy() {
//     // מנוי של הנתונים מבוטל כדי למנוע דליפות זיכרון
//     if (this.subscription) {
//       this.subscription.unsubscribe();
//     }
//   }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
// import { ChartHostComponent } from '../chart-host/chart-host.component';


@Component({
  selector: 'chart',
  standalone: false,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  // @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  // public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  //   scales: {
  //     x: {},
  //     y: {
  //       min: 10,
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       display: true,
  //     },
  //     // datalabels: {
  //     //   anchor: 'end',
  //     //   align: 'end',
  //     // },
  //   },
  // };
  //  barChartType = 'bar' as const;

   barChartData = {
    labels: [
      '11/23/2021', '11/24/2021', '11/25/2021', '11/26/2021', '11/27/2021', 
      '11/28/2021', '11/29/2021', '11/30/2021', '12/1/2021', '12/2/2021', '12/3/2021'
    ],
    datasets: [
      {
        label: 'Bitcoin Trade Volume',
        data: [
          494762556.34959996,
          480199475.88900006,
          332409438.7548,
          289094884.176,
          777492583.0165,
          277078998.492,
          252736299.37800002,
          367826530.49249995,
          522506214.22769994,
          479668944.2496,
          431885271.2832
        ],
        borderColor: 'rgba(0, 123, 255, 1)',  
        backgroundColor: 'rgba(0, 123, 255, 0.2)',  
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }
}
