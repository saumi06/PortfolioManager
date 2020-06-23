import { Component, OnInit } from '@angular/core';
import {StockData, ResponseResult, ResponseError} from '../../services/interfaces'
import {ApiServiceService} from '../../services/api-service.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  interestedStocks: Array<StockData>;
  // store the data of the stock that is clicked on or searched
  stockFocusData: StockData;

  stockSymbol: string = '';

  constructor(private apiService: ApiServiceService, private authService: AuthService) {
    this.interestedStocks = []
    this.stockSymbol = '';
   }

  ngOnInit(): void {
    // check for data in local storage 
  }


  /** 
   * Convert the result to our stock data interface 
   */
  // convertToStockData<T extends ResponseResult>(obj: T): StockData{
  //   return obj
  // }

  /** 
   * Get stock infromation if user enters information and presses enter 
   */
  public getStockData(e: any): void{
    if (e.key != "Enter") return

    // enter is presses make request
    console.log("Making request")
    this.apiService.getStockData(this.stockSymbol).subscribe(
      res => {
        console.log(res)
        
      }
    )

  }




}
