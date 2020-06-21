import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListStocksComponent} from './components/list-stocks/list-stocks.component'

const routes: Routes = [
  {
    component: ListStocksComponent,
    path: "list"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
