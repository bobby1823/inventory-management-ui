import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, WavesModule, CardsFreeModule, MDBBootstrapModule, NavbarModule, InputsModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    InputsModule,
    FormsModule, 
    ReactiveFormsModule,
    MDBBootstrapModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
