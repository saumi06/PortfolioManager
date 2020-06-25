import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListStocksComponent } from './components/list-stocks/list-stocks.component';

import { LoginComponent } from './components/login/login.component';
//import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuardService]  },
  { path: 'sign-in', component: LoginComponent },
  { path: 'home', component: MainPageComponent, canActivate: [AuthGuardService] },
  { path: '', component: ListStocksComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
