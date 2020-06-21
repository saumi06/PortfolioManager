import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
// import { User } from './user';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authInfo: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.authInfo = this.afAuth.authState;
    // pipe(switchMap(user => {
    //   if (user) {
    //     return this.afs.doc<firebase.User>(`users/${user.uid}`).valueChanges();
    //   } else {
    //     return of(null);
    //   }
    // }))

  
}
login(){
  this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((user) => { console.log(user); });
}

logout() {
  this.afAuth.signOut().then(() => { console.log('logged out') });
}
  // }
  // async googleSignin() {
  //   const provider = new auth.GoogleAuthProvider();
  //   const credential = await this.afAuth.signInWithPopup(provider);
  //   console.log(provider," :: ",credential);
  //   return this.updateUserData(credential.user);
  // }
  // updateUserData(user){
  //   const userRef : AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

  //   const data = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     userDOB: user.userDOB,
  //     location: user.location,
  //     emailVerified: user.emailVerified
  //   }
  //   return userRef.set(data, { merge:true })    
  // }

  // async signOut(){
  //   await this.afAuth.signOut();
  //   this.router.navigate(['/']);
  // }
}
