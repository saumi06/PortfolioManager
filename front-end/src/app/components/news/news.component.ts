import { ApiServiceService } from './../../services/api-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news;
 
  
  constructor(private Newsservice: ApiServiceService) {
   
  }
  data: object;
  ngOnInit() {
    this.news = this.Newsservice.getnews().subscribe(data => {
      console.log(data);
      console.log(data['items']);
      this.news = data['items'].result;
    });

  }
}

