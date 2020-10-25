import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListStocksComponent } from './components/list-stocks/list-stocks.component';

import { LoginComponent } from './components/login/login.component';
//import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewsComponent } from './components/news/news.component';
import { HelpComponent } from './components/help/help.component';

const routes: Routes = [
  { path: 'help' , component: HelpComponent},
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuardService]  },
  { path: 'news', component:NewsComponent},
  { path: 'sign-in', component: LoginComponent },
  { path: 'home', component: MainPageComponent, canActivate: [AuthGuardService] },
  { path: '', component: MainPageComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
