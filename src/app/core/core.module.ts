import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { InputsModule, MDBBootstrapModule, NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    InputsModule,
    FormsModule, 
    ReactiveFormsModule,
    MDBBootstrapModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
