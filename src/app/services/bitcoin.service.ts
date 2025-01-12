import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, switchMap, timer } from "rxjs";

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

    //   private _handleError(err: HttpErrorResponse) {
    //         console.log('err:', err)
    //         return throwError(() => err)
    //     }
  }


//   getMarketPrice() {

//   }


//   getConfirmedTransactions() {

//   }
// }


