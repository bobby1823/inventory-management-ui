import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AddComponent } from './add/add.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { PendingProductComponent } from './pending-product/pending-product.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthGuard } from '../services/auth.guard';
import { PendingProductUserComponent } from './pending-product-user/pending-product-user.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { AllProductsComponent } from './all-products/all-products.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: '',
        component: ProductlistComponent
      },
      {
        path: 'addproduct',
        component: AddComponent
      },
      {
        path: 'displayproduct',
        component: ProductlistComponent
      },
      {
        path: 'pendingproduct',
        component: PendingProductComponent,
        canActivate: [AuthGuard], data:{
          roles: ['Store Manager']
        }
      },
      {
        path: 'pendingproductuser',
        component: PendingProductUserComponent,
        canActivate: [AuthGuard], data:{
          roles: ['Department Manager']
        }
      },
      {
        path: 'update',
        component: UpdateproductComponent
      }
    ]
  },
  {
    path: 'productlist',
    component: AllProductsComponent,
    canActivate: [AuthGuard], data:{
      roles: ['Store Manager']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRecordRoutingModule { }
