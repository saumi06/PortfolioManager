import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { ResponseError, ResponseResult} from './interfaces'

@Injectable({
  providedIn: 'root'
})


export class ApiServiceService {


  constructor(private http: HttpClient) { }


  createResult<T extends ResponseResult>(obj: T): ResponseResult{ return obj; }

  createError<T extends ResponseError>(obj: T): ResponseError { return obj }


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


  /** 
   * This function converts the response to ResponseInterface or ResponseErrorInterface 
   */
  convertToInterface<T>(res: T, property: string): ResponseError | ResponseResult | null {
    if(res == null) return null

    if( res.hasOwnProperty(property)){
      return  this.createResult({code: 200, message: "Success", response: res[property]["result"]})
    }
    else if(res.hasOwnProperty("error") && res["error"] != null){
      return this.createError({message: res[property]["error"] , code: 500})
    }

  }
}
