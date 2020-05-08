import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { NoAccessComponent } from './no-access/no-access.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';

const routes: Routes = [
  {
    path: '',
    loadChildren: './core/core.module#CoreModule'
  },
  {
    path: 'inventory',
    loadChildren: './inventory-record/inventory-record.module#InventoryRecordModule',
    canActivate: [AuthGuard], data:{
      roles: ['Store Manager' , 'Department Manager']
    }
  },
  {
    path: 'noaccess',
    component: NoAccessComponent
  },
  {
    path: 'allproducts',
    loadChildren: './inventory-record/inventory-record.module#InventoryRecordModule',
    canActivate: [AuthGuard], data:{
      roles: ['Store Manager']
    } 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
