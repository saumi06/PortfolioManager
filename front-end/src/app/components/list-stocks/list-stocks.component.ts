import { Component, OnInit } from '@angular/core';

import {ApiServiceService} from '../../services/api-service.service'



@Component({
  selector: 'app-list-stocks',
  templateUrl: './list-stocks.component.html',
  styleUrls: ['./list-stocks.component.css']
})

// TODO Create an interface of type T with code, data, and message
export class ListStocksComponent implements OnInit {

  
  stocks: any;

  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
    this.getStocks();
  }

  getStocks(){
    let data: any = this.apiService.getStocksData();
    this.stocks = data;
    console.log(this.stocks)
   
  }

}
