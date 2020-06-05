import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { InprogressComponent } from './components/inprogress/inprogress.component';
import { CompletedComponent } from './components/completed/completed.component';
import { ReportsComponent } from './components/reports/reports.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'order',
    pathMatch: 'full'
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'inprogress',
    component: InprogressComponent,
  },
  {
    path: 'completed',
    component: CompletedComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
