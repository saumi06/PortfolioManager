import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { ResponseError, ResponseResult} from './interfaces'

@Injectable({
  providedIn: 'root'
})


export class ApiServiceService {


  constructor(private http: HttpClient) { }





  makeRequest(url: string): Observable<Object> {
    return this.http.get(
      url,
      {
        headers: {
          'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
          'x-rapidapi-key': 'r0Y2ld4HX3msh5XbaEcmtzEcubWQp1ssC3cjsnbFIN1NPKRH25'
        }
      }
    )
  }


  /** 
   * Get data of all the stocks 
   */
  getStocksData(): Observable<Object> {
    return this.makeRequest('https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US&lang=en')
  }

  getPortfolioData(): any {

  }



  /** 
   * THis method gets a single stock data 
   */
  getStockData(symbol: string): Observable<Object> {
    return this.makeRequest(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?region=US&lang=en&symbol=${symbol}`)
  }



}
