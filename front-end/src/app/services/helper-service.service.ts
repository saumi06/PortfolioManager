import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {

  	constructor() { }


  /** 
   * This helper function maps stock data with default values 
   */
  	mapDefaultKeyStatistics<T>(stock: T) {
		let keyStats = { weekChange52: "", beta: "", quaterlyGrowth: "", eps: "", pe: "" }

		// check for empty values
		if (!("defaultKeyStatistics" in stock) || stock["defaultKeyStatistics"] == undefined) return keyStats;

		let data = stock["defaultKeyStatistics"]

 	 	keyStats.weekChange52 = ("52WeekChange" in data ) ? stock["defaultKeyStatistics"]["52WeekChange"]["fmt"]: "N/A",
 	 	keyStats.beta =  ("beta" in data) ? stock["defaultKeyStatistics"]["beta"]["fmt"]: "N/A",
 	 	keyStats.quaterlyGrowth = ("earningsQuarterlyGrowth" in data) ? stock["defaultKeyStatistics"]["earningsQuarterlyGrowth"]["fmt"]: "N/A",
 	 	keyStats.eps = ("forwardEps" in data) ?  stock["defaultKeyStatistics"]["forwardEps"]["fmt"] : "N/A",
 	 	keyStats.pe = ("forwardPE" in data) ? stock["defaultKeyStatistics"]["forwardPE"]["fmt"] : "N/A"


		return keyStats;


	  }
	  
	/** 
   	* This helper function maps functional stock data with default values 
   	*/
  	mapFinancialData<T>(stock: T) {
		let financialData = { currentPrice: "", financialCurrency: "", currentRatio: "", earningsGrowth: "", roa: "", roe: "" }

		if (!("financialData" in stock) || stock["financialData"] == undefined) return financialData;

		let data = stock["financialData"]

		financialData.currentPrice = ("currentPrice" in data) ? stock["financialData"]["currentPrice"]["fmt"]: "N/A"
		financialData.financialCurrency = ("financialCurrency" in data) ? stock["financialData"]["financialCurrency"] : "N/A"
		financialData.currentRatio =  ("currentRatio" in data) ? stock["financialData"]["currentRatio"]["fmt"] : "N/A"
		financialData.earningsGrowth = ("earningsGrowth" in data) ? stock["financialData"]["earningsGrowth"]["fmt"]: "N/A"
		financialData.roa = ("returnOnAssets" in data) ? stock["financialData"]["returnOnAssets"]["fmt"] : "N/A"
		financialData.roe = ("returnOnEquity" in data) ? stock["financialData"]["returnOnEquity"]["fmt"] : "N/A"


		return financialData

	  }
	  
	/** 
	 * This function maps the mean Data Chart 
	 */
	mapMeanDataChart<T>(stock: T) {
		let meanDataChart = {targetLow: 0, targetMedian: 0, targetHigh: 0}

		if (!("financialData" in stock) || stock["financialData"] == {}) return meanDataChart;

		let data = stock["financialData"]

		meanDataChart.targetHigh = ("targetHighPrice" in data) ? stock["financialData"]["targetHighPrice"]["raw"] : 0
		meanDataChart.targetLow = ("targetLowPrice" in data) ? stock["financialData"]["targetLowPrice"]["raw"] : 0
		meanDataChart.targetMedian =  ("targetMedianPrice" in data) ? stock["financialData"]["targetMedianPrice"]["raw"] : 0

		return meanDataChart;



	}

	/** 
	 * This function maps the earning Data Chart 
	 */
	mapEarningDataChart<T>(stock: T) {
		let   earningsChart = [{actual: "", date: 0, expected: ""}]


		if (!("earnings" in stock) || stock["earnings"] == undefined) return earningsChart;

		let data = stock["earnings"]

		if ("earningsChart" in data && data["earningsChart"]["quarterly"] != undefined) {

			// pop elements from earningsChart
			earningsChart.pop()
			data = data["earningsChart"]["quarterly"] 

			for (let quater of data) {
				let obj = {date: quater["date"], actual: quater["actual"]["raw"], expected: quater["estimate"]["raw"]}
				earningsChart.push(obj)
			}

		}

		return earningsChart.sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0)



	}
}
