import { ApiServiceService } from './../../services/api-service.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news;
  user;
  data: object; 
  
  constructor(private Newsservice: ApiServiceService,private authService: AuthService) {
    this.user = this.authService.authInfo;
   
  }
 
  ngOnInit() {
    this.news = this.Newsservice.getnews().subscribe(data => {
      console.log(data);
      console.log(data['items']);
      this.news = data['items'].result;
    });

  }
  
  logOut() {
    this.authService.logout();
  }
}

