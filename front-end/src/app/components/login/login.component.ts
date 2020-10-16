import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';

import { ToastrService } from 'ngx-toastr';


class USERS{
constructor(public name){}
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public users: AngularFireList<USERS[]>;
  user;
  constructor(private auth: AuthService,private db: AngularFireDatabase) {
    this.user = auth.authInfo;
    this.users = db.list('/users');
  }

  ngOnInit(): void {
  }

  logIn() {
    console.log("LOGIN");
    this.auth.login();
    
  }
}
