import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  faCoffee = faCoffee;
user;
  constructor(private authService: AuthService) {
    this.user = this.authService.authInfo; }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logout();
  }
}
