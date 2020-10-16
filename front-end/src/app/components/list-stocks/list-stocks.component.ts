import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResponseError, ResponseResult, MarketChangeFormat, basicStockData } from '../../services/interfaces';

import { ApiServiceService } from '../../services/api-service.service';
// import { LocalStorage } from '@ngx-pwa/local-storage'
import { ToastrService } from 'ngx-toastr';
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

	@Output() getStockData = new EventEmitter();


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
		} catch (e) {
			console.log('Error mapping stock')
			console.log(stock);
			return null;

		}

	}

	constructor(private apiService: ApiServiceService, private toastr: ToastrService, private authService: AuthService) {
		this.user = authService.authInfo;
	}

	ngOnInit() {
		// this.stocks = JSON.parse(localStorage.getItem("marketSummary"))
		if (this.stocksInformation == null) {
			// if no input is provided
			this.getStocks();
		} else {
			// set stocks to our input 
			this.stocks = this.stocksInformation;

		}
	}
	



	/**
	 * Open The data regarding a stock
	 */
	openData(stockSymbol: string) {
		// check if user is logged in
		if (this.authService.authInfo) {
			// TODO call another component
			this.getStockData.emit(stockSymbol);
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
				const property = 'marketSummaryResponse'
				if (res == null || !(property in res)) {
					console.log('no data from back end')
				} else if (res[property]['error'] == null) {
					this.stocks = this.createResult({
				code: 200,
				message: 'Success',
				response: ((): Array<basicStockData> => {
					const returnData: Array<basicStockData> = [];
					for ( const stock of res[property]['result']) {
						returnData.push(this.createBasicStockData(stock))
					}
					return returnData;
							 	})()
					});
				} else {
					this.error = this.createError({code: 500, message: res[property]["error"]});
					this.toastr.error(this.error.message, 'Error', {
						timeOut: 3000
					});
				}

			}
		)

	}

}
