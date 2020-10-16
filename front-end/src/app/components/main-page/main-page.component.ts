import { Component, OnInit } from '@angular/core';
import {summaryStockData, ResponseResult, ResponseError, basicStockData} from '../../services/interfaces'
import {ApiServiceService} from '../../services/api-service.service';
import { HelperServiceService } from '../../services/helper-service.service';
import { AuthService } from '../../services/auth.service';
import { Chart } from 'angular-highcharts';
import {ToastrService} from 'ngx-toastr';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.css']
})


export class MainPageComponent implements OnInit {

	interestedStocks: ResponseResult;
	// store the data of the stock that is clicked on or searched
	stockFocusData: ResponseResult;

	stockSymbol: string;

	expectedEarnings: Chart;

	quaterlyReport: Chart;

	loading: boolean;

	loadingSrc: string;
	
	
	user;
	uid;

	constructor(private apiService: ApiServiceService, private authService: AuthService, private helper: HelperServiceService) {
		this.stockSymbol = '';
		this.loading = false;
		this.loadingSrc ='assets/loading.gif';
		this.user = this.authService.authInfo;
	 }

	ngOnInit(): void {
		// check for data in local storage
		this.getPortfolioData();
	}

	logOut() {
    this.authService.logout();
  }
	/** 
	 * Get the flagged stocks data 
	 */
	getPortfolioData(): void {
		this.apiService.getPortfolioData().subscribe((res: Array<string>) => {
			if (res == null) {
				return;
			}
			this.loading = true;
			// make request to get data about flagged stocks
			this.apiService.getPortfolioData(res.join(',')).subscribe(data => {
				const property = "quoteResponse";
				if (data != null && property in data && data[property]["errors"] == null){
					this.interestedStocks = this.helper.mapBasicStockData(data[property]);
					console.log("Interested Stocks");
					console.log(this.interestedStocks);
				} else {
					console.log('Api request to get flagged data failed')
				}
				this.loading = !this.loading;
			});

		});
	}


	/**
	 * Convert the result to our stock data interface
	 */
	convertStockSummary<T>(stock: T): summaryStockData{
		return {
			name: ("price" in stock && stock["price"] != undefined) ? stock["price"]["shortName"]: "N/A",
			keyStats: this.helper.mapDefaultKeyStatistics(stock),
			earningsChart: this.helper.mapEarningDataChart(stock),
			financialData: this.helper.mapFinancialData(stock),
			meanDataChart: this.helper.mapMeanDataChart(stock)
		}

	}

	/**
	 * This function handles the event of the child component to get additional
	 * stock data
	 */
	public getChildStockData(stockSymbol: string) {
		this.stockSymbol = stockSymbol;
		this.getStockData({ key: 'Enter' });
	}


	/**
	 * Get stock infromation if user enters information and presses enter
	 */
	public getStockData(e: any): void {
		if (e.key !== 'Enter') { return; }

		this.loading = true;
		// enter is presses make request
		console.log("Making request")
		this.apiService.getStockData(this.stockSymbol).subscribe(
			res => {
				this.loading = !this.loading;
				if (res == null) return;


				console.log(res);

				this.stockFocusData = {
					code: 200,
					message: 'Success',
					response: this.convertStockSummary(res)
				}

				console.log(this.stockFocusData);

				// call to plot charts
				this.plotCharts(this.stockFocusData.response as summaryStockData)


		}, () => {})

	}



	/**
	 * THis method is used to plot chart
	 */
	plotCharts(data: summaryStockData): void{

		console.log(data)

		this.expectedEarnings = new Chart({
			chart: {
				type: "line"
			},
			title: {
				text: 'Expected Earning'
			},
			credits: {
				enabled: false
			},
			series: [
				{
				type: 'line',
				name: 'Target High',
				data: [Number(data.financialData.currentPrice), data.meanDataChart.targetHigh]
				},
				{
				type: 'line',
				name: 'Target Median',
				data: [Number(data.financialData.currentPrice), data.meanDataChart.targetMedian]
				},
				{
				type: 'line',
				name: 'Target Low',
				data: [ Number(data.financialData.currentPrice), data.meanDataChart.targetLow]
				},
			]
		});
  
  /** 
   * Convert the result to our stock data interface 
   */
  // convertToStockData<T extends ResponseResult>(obj: T): StockData{
  //   return obj
  // }

		let earnings: Array<{actual: String, date: number, expected: String}> = data.earningsChart
		let actual: Array<number> = []
		let expected: Array<number> = []

		for (let quater of earnings) {
			actual.push(Number(quater.actual))
			expected.push(Number(quater.expected))
		}

		this.quaterlyReport = new Chart({
			chart: {
				type: 'column'
			},
			title: {
				text: 'Last 4 quaters Earnings'
			},
			xAxis: {
				categories: [
					"Q1",
					"Q2",
					"Q3",
					"Q4"
				],
				crosshair: true
			},
			series: [{
				type: 'column',
				name: 'actual',
				data: actual
			},
			{
				type: 'column',
				name: 'expected',
				data: expected
			}]
		})


	}


	addFlaggedStock(stockSymbol: string): void {
		console.log("Added this stock to flagged");
		this.apiService.updateLocalStorage(stockSymbol);
	}

	removeFlaggedStock(stockSymbol: string):void{
		console.log("Remove this stock from flagged");
		this.apiService.removeFromLocalStorage(stockSymbol);
	}
}
