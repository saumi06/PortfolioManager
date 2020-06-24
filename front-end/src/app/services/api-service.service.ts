import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
	providedIn: 'root'
})

export class ApiServiceService {


	public LOCALFLAGGED = 'FlaggedStocks';

	constructor(private http: HttpClient, protected localStorage: LocalStorage) { }

	makeRequest(url: string): Observable<Object> {
		return this.http.get(
			url,
			{
				headers: {
					'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
					'x-rapidapi-key': '4927cfb37dmsh7d7fd05e60e6346p13bd0djsn1d90f07486b4'
				}
			}
		)
	}


	/** 
	 * Get data of all the stocks 
	 */
	getStocksData(): Observable<Object> {
		// return this.makeRequest('https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US&lang=en')
		return this.makeRequest('assets/data.json');
	}

	getPortfolioData(): any {

	}



	/** 
	 * THis method gets a single stock data 
	 */
	getStockData(symbol: string): Observable<Object> {
		// return this.makeRequest(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?region=US&lang=en&symbol=${symbol}`)
		return this.makeRequest('assets/stock.json');
	}



	/**
	 * Add flagged stock symbol to local storage
	 */
	updateLocalStorage(stockSymbol: string): void {
		// get from local storage
		this.localStorage.getItem('FlaggedStocks').subscribe((flaggedStocks: Array<string>) => {
			if (flaggedStocks != null) {
				flaggedStocks.push(stockSymbol);
				console.log(flaggedStocks);
			} else {
				flaggedStocks = [stockSymbol];
			}

			this.localStorage.setItem(this.LOCALFLAGGED, flaggedStocks).subscribe(() => { console.log('LocalStorage updated'); }, () => { });


		}, (error) => {
			console.log('error updating local storage')
			console.log(error);
		});
	}



}
