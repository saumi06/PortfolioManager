import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { exception } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  checkStatusCode(data){

  }

  makeRequest(url: string): Observable<Object>{
    return this.http.get(
      'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US&lang=en',
       {
         headers: {
          'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
          "x-rapidapi-key': 'r0Y2ld4HX3msh5XbaEcmtzEcubWQp1ssC3cjsnbFIN1NPKRH25',
        }
      }
    )
  }


  getStocksData(): any{
    this.makeRequest('https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US&lang=en').subscribe(
      res => {
        if(res){
          return res
        }
        else{
          throw new exception('No response from API')
        }



      }
    )

  }

  getPortfolioData(): any{

  }
}
