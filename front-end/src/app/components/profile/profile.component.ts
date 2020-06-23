import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  constructor(private authService: AuthService) {
    this.user = this.authService.authInfo;
   }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logout();
  }
}
