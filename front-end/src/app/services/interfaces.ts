/** 
 * This file consists of interface that are used in service and component
 */


export interface ResponseResult {
  code: number,
  message: string
  response: basicStockData | basicStockData[] | summaryStockData;
}


export interface ResponseError{
  code: number,
  message: string
}


export interface MarketChangeFormat{
  raw: number, 
  fmt: string
}



export interface basicStockData{
  name: string;
  symbol: string;
  marketState: string;
  quoteType: string;
  price: string;
  changePrice: string;
  changePercent: string;
  changePercentRaw: number;

}


export interface summaryStockData{
  name: string,
  keyStats: { weekChange52: String, beta: String, quaterlyGrowth: String, eps: String, pe: String },
  earningsChart: Array<{actual: String, date: number, expected: String}> ,
  financialData: { currentPrice: String, financialCurrency: String, currentRatio: String, earningsGrowth: String, roa: String, roe: String },
  meanDataChart: {targetLow: number, targetMedian: number, targetHigh: number}
}