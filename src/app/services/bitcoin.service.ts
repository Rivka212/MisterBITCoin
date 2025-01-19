import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, switchMap, throwError, timer } from "rxjs";
import { Trade } from "../models/chart.model";
import { storageService } from "./async-storage.service";

type Point = { x: number, y: number }

@Injectable({
  providedIn: 'root'
})

export class BitcoinService {

  TRADE_VOLUME_KEY = 'tradeVolume'

  constructor(private http: HttpClient) {}

    getRateStream(coins: number) {
      return timer(0, 1000).pipe(
        switchMap(() => this.getRate(coins))
      )
    }

    getRate(coins: number): Observable < string > {
      return this.http.get<string>(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
    }

    getTradeVolume(): Observable<Trade[]> {
      const data = storageService.load(this.TRADE_VOLUME_KEY)
      // console.log('data service', data);

      if (data) return of(data)
      return this.http.get<{ values: Point[] }>(`https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`)
          .pipe(map(res => {
              //prepare the data in a way that the chart can render
              const vals = res.values.map(item => { return { name: new Date(item.x * 1000).toLocaleDateString("en-US"), value: item.y } })
              storageService.store(this.TRADE_VOLUME_KEY, vals)
              return vals
          }))
  }

      private _handleError(err: HttpErrorResponse) {
            console.log('err:', err)
            return throwError(() => err)
        }
  }


//   getMarketPrice() {

//   }


//   getConfirmedTransactions() {

//   }
// }


