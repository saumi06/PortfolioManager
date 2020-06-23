import { Component, OnInit } from '@angular/core';
import {summaryStockData, ResponseResult, ResponseError, basicStockData} from '../../services/interfaces'
import {ApiServiceService} from '../../services/api-service.service';
import { HelperServiceService } from '../../services/helper-service.service';
import { AuthService } from '../../services/auth.service';
import { Chart } from 'angular-highcharts';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.css']
})


export class MainPageComponent implements OnInit {

	interestedStocks: Array<basicStockData>;
	// store the data of the stock that is clicked on or searched
	stockFocusData: ResponseResult;

	stockSymbol: string = '';

	expectedEarnings: Chart;

	quaterlyReport: Chart;

	constructor(private apiService: ApiServiceService, private authService: AuthService, private helper: HelperServiceService) {
		this.interestedStocks = []
		this.stockSymbol = '';
	 }

	ngOnInit(): void {
		// check for data in local storage 
	}


	/** 
	 * Convert the result to our stock data interface 
	 */
	convertStockSummary<T>(stock: T): summaryStockData{
		return {
			keyStats: this.helper.mapDefaultKeyStatistics(stock),
			earningsChart: this.helper.mapEarningDataChart(stock),
			financialData: this.helper.mapFinancialData(stock),
			meanDataChart: this.helper.mapMeanDataChart(stock)
		}

	}

	/** 
	 * Get stock infromation if user enters information and presses enter 
	 */
	public getStockData(e: any): void{
		if (e.key != "Enter") return

		// enter is presses make request
		console.log("Making request")
		this.apiService.getStockData(this.stockSymbol).subscribe(
			res => {
				if (res == null) return;
				

				console.log(res)

				this.stockFocusData = {
					code: 200,
					message: "Success",
					response: this.convertStockSummary(res)
				}

				console.log(this.stockFocusData);

				// call to plot charts
				this.plotCharts(<summaryStockData>this.stockFocusData.response)
				
		})

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
				name: 'Target High',
				data: [Number(data.financialData.currentPrice), data.meanDataChart.targetHigh]
				},
				{
				name: 'Target Median',
				data: [Number(data.financialData.currentPrice), data.meanDataChart.targetMedian]
				},
				{
				name: 'Target Low',
				data: [ Number(data.financialData.currentPrice), data.meanDataChart.targetLow]
				},
			]
		});

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
				text: 'Quaterly Earnings'
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
			// plotOptions: {
			// 	column: {
			// 		stacking: 'normal',
			// 		dataLabels: {
			// 			enabled: true
			// 		}
			// 	}
			// },
			series: [{
				name: "actual",
				data: actual 			
			},
			{
				name: "expected",
				data: expected
			}]
		}) 
		

	}

	
	




}
