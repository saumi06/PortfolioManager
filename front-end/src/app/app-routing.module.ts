import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListStocksComponent} from './components/list-stocks/list-stocks.component';

const routes: Routes = [
  {
    component: ListStocksComponent,
    path: 'list'
  },
  { path: '',   redirectTo: '/list', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
