import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap} from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private auth:AuthService) { }
  canActivate():Observable<boolean>{
    return this.auth.authInfo.pipe(take(1)
    ,map(authInfo => !!authInfo)
    ,tap(auth => !auth ? this.router.navigate(['/']): true )
    )
  }
}
