import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
// import { User } from './user';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authInfo: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.authInfo = this.afAuth.authState;

  }

  login() {

    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((user) => { console.log(user); });
    this.toastr.success('Successfully Logged In', 'Congratulations', {
      timeOut: 3000
    });
   
  }
  logout() {
    this.afAuth.signOut().then(() => { console.log('logged out') });
    this.router.navigate(['sign-in']);
    localStorage.clear();
 
    this.toastr.success('Successfully Logged Out', 'Congratulations', {
      timeOut: 3000
    });
  }
}
