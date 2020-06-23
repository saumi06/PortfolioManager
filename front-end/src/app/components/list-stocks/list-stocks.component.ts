import { Component, OnInit, Input } from '@angular/core';
import { ResponseError, ResponseResult, MarketChangeFormat, basicStockData } from '../../services/interfaces';

import { ApiServiceService } from '../../services/api-service.service';

import { ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-stocks',
  templateUrl: './list-stocks.component.html',
  styleUrls: ['./list-stocks.component.css']
})

// TODO Create an interface of type T with code, data, and message
export class ListStocksComponent implements OnInit {


  	stocks: ResponseResult;
  	error: ResponseError;
  	user;

    @Input() stocksInformation: ResponseResult;
    @Input() callback: any;
    


  	createResult<T extends ResponseResult>(obj: T): ResponseResult { return obj; }

  	createError<T extends ResponseError>(obj: T): ResponseError { return obj }

	createBasicStockData<T>(stock: T): basicStockData{
		try {

			return {
				name: stock['shortName'],
				symbol: stock['symbol'],
				marketState: stock['marketState'],
				quoteType: stock['quoteType'],
				price: stock['regularMarketPrice']['fmt'],
				changePrice: stock['regularMarketChange']['fmt'],
				changePercent: stock['regularMarketChangePercent']['fmt'],
				changePercentRaw: stock['regularMarketChange']['raw']
			}		
		}
		catch (e) {
			console.log("Error mapping stock")
			console.log(stock)
			return null

		}

	}

  constructor(private apiService: ApiServiceService, private toastr: ToastrService, private authService: AuthService) {
    this.user = authService.authInfo;
  }

  ngOnInit() {
    if (this.stocksInformation == null) {
      // if no input is provided 
	  this.getStocks();
    }
    else {
      this.stocks = this.stocksInformation;
    }
  }

  /** 
   * Returns the color of the stock change green if positive else red
   */
  getStockChangeColor<T extends MarketChangeFormat>(change: T): string {
    return (change.raw < 0) ? '#ff0000' : '#7CFC00'
  }


  /** 
   * Open The data regarding a stock
   */
  openData(stockSymbol: string) {
    // check if user is logged in 
    if (this.authService.authInfo) {
      this.callback(stockSymbol);
    } else {    // if not do not display alert

      this.toastr.error('To view additional information', 'Please login', {
        timeOut: 3000
      });
      console.log(stockSymbol);
    }
  }


  getStocks() {
    this.apiService.getStocksData().subscribe(
      res => {
        let property: string = "marketSummaryResponse"
        if (res == null || !(property in res)) {
          console.log("no data from back end ")
		}

        else if (res[property]["error"] == null) {
          this.stocks = this.createResult({
			  code: 200,
			  message: "Success",
			  response: ((): Array<basicStockData> => {
					let returnData: Array<basicStockData> = [];
					for ( let stock of res[property]["result"]) {
						console.log(stock)
						returnData.push(this.createBasicStockData(stock))
					}
					return returnData;
               	})()
        	});
        }
        else{
          	this.error = this.createError({code: 500, message: res[property]["error"]});
          	this.toastr.error(this.error.message, 'Error', {
          	  timeOut: 3000
          	})
        }

      }
    )

  }

}
