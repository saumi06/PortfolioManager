import { Component, OnInit } from '@angular/core';
import { ResponseError, ResponseResult, MarketChangeFormat } from '../../services/interfaces'

import {ApiServiceService} from '../../services/api-service.service';

import { ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';



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
    return (change.raw < 0) ?  '#ff0000': '#7CFC00'
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
        let result: ResponseError | ResponseResult | null = this.apiService.convertToInterface(res, property);
        if (result.code == 200) {
          this.stocks = <ResponseResult>result;
        }
        else if (result.code == 500){
          
          this.error = <ResponseError>result;


        }

      }
    )

  }

}
