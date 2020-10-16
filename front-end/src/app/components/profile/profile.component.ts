import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {ApiServiceService} from '../../services/api-service.service';
import {summaryStockData, ResponseResult, ResponseError, basicStockData} from '../../services/interfaces'

import { HelperServiceService } from '../../services/helper-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  loading: boolean;
  interestedStocks: ResponseResult;
  favStock:ResponseResult;

  constructor(private apiService: ApiServiceService, private authService: AuthService, private helper: HelperServiceService) {
    this.user = this.authService.authInfo;
   }

  ngOnInit(): void {
   // console.log(localStorage.getItem('FlaggedStocks'));
    this.getPortfolioData();
  }

  logOut() {
    this.authService.logout();
  }

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
          console.log(this.interestedStocks.response);
          this.favStock = this.interestedStocks;
				} else {
					console.log('Api request to get flagged data failed')
				}
				this.loading = !this.loading;
			});

		});
	}
  removeFlaggedStock(stockSymbol: string):void{
		console.log("Remove this stock from flagged");
    this.apiService.removeFromLocalStorage(stockSymbol);
    var myobj = document.getElementById(stockSymbol);
    // myobj.setAttribute ("style", "font-size:12px;   transition: all 1s ease-out;");
//     myobj.style.transitionTimingFunction = "ease-out";
//     myobj.style.transition= "0.2s";
    //myobj.style.fontSize = "12px";
   // myobj.style.transition = "all 1s ease-out";
 myobj.className = "someElement";
  //  myobj.setAttribute("style","background-color:green;transition-timing-function: ease-out; transition: 0.2s;");
   myobj.remove();
}
}
