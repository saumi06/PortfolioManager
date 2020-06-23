import { Component, OnInit } from '@angular/core';
import {summaryStockData, ResponseResult, ResponseError, basicStockData} from '../../services/interfaces'
import {ApiServiceService} from '../../services/api-service.service';
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

	expectedEarnings: any;

  constructor(private apiService: ApiServiceService, private authService: AuthService) {
    this.interestedStocks = []
	this.stockSymbol = '';
	// this.expectedEarnings = new Chart({
	// 	title: {
	// 		text: 'Earning Forcast '
	// 	},
	
	// 	yAxis: {
	// 		title: {
	// 			text: 'Price'
	// 		}
	// 	},
	
	// 	// xAxis: {
	// 	// 	accessibility: {
	// 	// 		rangeDescription: 'Range: 2010 to 2017'
	// 	// 	}
	// 	// },
	
	// 	// legend: {
	// 	// 	layout: 'vertical',
	// 	// 	align: 'right',
	// 	// 	verticalAlign: 'middle'
	// 	// },
	
	// 	// plotOptions: {
	// 	// 	series: {
	// 	// 		label: {
	// 	// 			connectorAllowed: false
	// 	// 		},
	// 	// 		pointStart: 2010
	// 	// 	}
	// 	// },
	
	// 	series: [
	// 		{ data: [1, 2, 3]},
	// 		{ data: [4, 5, 6] },
	// 		{ data: [1, 2, 5]}

		
	// 	]	
	
	// 	// responsive: {
	// 	// 	rules: [{
	// 	// 		condition: {
	// 	// 			maxWidth: 500
	// 	// 		},
	// 	// 		chartOptions: {
	// 	// 			legend: {
	// 	// 				layout: 'horizontal',
	// 	// 				align: 'center',
	// 	// 				verticalAlign: 'bottom'
	// 	// 			}
	// 	// 		}
	// 	// 	}]
	// 	// }
	
	//   });
   }

  ngOnInit(): void {
    // check for data in local storage 
  }


  /** 
   * Convert the result to our stock data interface 
   */
  convertStockSummary<T>(stock: T): summaryStockData{
	  return {
		  keyStats: {
			  weekChange52: stock["defaultKeyStatistics"]["52WeekChange"]["fmt"],
			  beta: stock["defaultKeyStatistics"]["beta"]["fmt"],
			  quaterlyGrowth: stock["defaultKeyStatistics"]["earningsQuarterlyGrowth"]["fmt"],
			  eps: stock["defaultKeyStatistics"]["forwardEps"]["fmt"],
			  pe: stock["defaultKeyStatistics"]["forwardPE"]["fmt"]
		  	},
			earningsChart: {},
		  financialData: {
			  currentPrice: stock["financialData"]["currentPrice"]["fmt"],
			  financialCurrency: stock["financialData"]["financialCurrency"],
			  currentRatio: stock["financialData"]["currentRatio"]["fmt"],
			  earningsGrowth: stock["financialData"]["earningsGrowth"]["fmt"],
			  roa: stock["financialData"]["returnOnAssets"]["fmt"],
			  roe: stock["financialData"]["returnOnEquity"]["fmt"]
		  	},
		  meanDataChart: {
			  targetHigh: stock["financialData"]["targetHighPrice"]["raw"] ,
			  targetLow: stock["financialData"]["targetLowPrice"]["raw"],
			  targetMedian:  stock["financialData"]["targetMedianPrice"]["raw"]
			}
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

		this.stockFocusData = {
			code: 200,
			message: "Success",
			response: this.convertStockSummary(res)
		}

		// call to plot charts
		this.plotCharts(<summaryStockData>this.stockFocusData.response)
        
      }
    )

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
		

	}

	
	




}
