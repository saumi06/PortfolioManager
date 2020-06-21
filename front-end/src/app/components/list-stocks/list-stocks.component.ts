import { Component, OnInit } from '@angular/core';
import { ResponseError, ResponseResult, MarketChangeFormat } from '../../interfaces'

import {ApiServiceService} from '../../services/api-service.service';

import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-list-stocks',
  templateUrl: './list-stocks.component.html',
  styleUrls: ['./list-stocks.component.css']
})

// TODO Create an interface of type T with code, data, and message
export class ListStocksComponent implements OnInit {


  stocks: ResponseResult;
  error: ResponseError;

  createResult<T extends ResponseResult>(obj: T): ResponseResult{ return obj; }

  createError<T extends ResponseError>(obj: T): ResponseError { return obj }

  constructor(private apiService: ApiServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getStocks();
  }

  /** 
   * Returns the color of the stock change green if positive else red
   */
  getStockChangeColor<T extends MarketChangeFormat>(change: T): string {
    return (change.raw < 0) ?  'red': 'green'
  }


  /** 
   * Open The data regarding a stock
   */
  openData(stockSymbol: string) {
    // check if user is logged in 


    // if not do not display alert
    this.toastr.error('To view additional information', 'Please login', {
      timeOut: 3000
    });
    console.log(stockSymbol);
  }


  getStocks() {
    this.apiService.getStocksData().subscribe(
      res => {
        let property: string = "marketSummaryResponse"
        if( res.hasOwnProperty(property)){
          this.stocks =  this.createResult({code: 200, message: "Success", response: res[property]["result"]})
          console.log(this.stocks);
        }
        else if(res.hasOwnProperty("error") && res["error"] != null){
          this.error = this.createError({message: res[property]["error"] , code: 500})
        }

      }
    )

  }

}
