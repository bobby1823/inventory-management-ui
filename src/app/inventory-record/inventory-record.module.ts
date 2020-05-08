import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRecordRoutingModule } from './inventory-record-routing.module';
import { AddComponent } from './add/add.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PendingProductComponent } from './pending-product/pending-product.component';
import { InputsModule, MDBBootstrapModule, NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PendingProductUserComponent } from './pending-product-user/pending-product-user.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { AllProductsComponent } from './all-products/all-products.component';

@NgModule({
  declarations: [
    AddComponent,
    ProductlistComponent,
    SidenavComponent,
    PendingProductComponent,
    PendingProductUserComponent,
    UpdateproductComponent,
    AllProductsComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    FormsModule, 
    ReactiveFormsModule,
    MDBBootstrapModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    InventoryRecordRoutingModule
  ]
})
export class InventoryRecordModule { }
