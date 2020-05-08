
import { Component, OnInit } from '@angular/core';
import { UserInformation } from '../User';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UserDto } from '../UserDto';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  show: boolean;
  loginshow: boolean;
  confirmshow: boolean;
  user = new UserInformation();
  userdto = new UserDto();
  userRole: any;
  patternEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z_\-\.])+\.([A-Za-z]{2,3})$/;

  constructor(private formbuilder: FormBuilder,private router: Router,private userService:UserService) {
    this.show = false;
    this.loginshow = false;
    this.confirmshow = false;
  }

  ngOnInit() {
    if(sessionStorage.getItem('isLoggedIn'))
    this.router.navigate(['/'])
  }

  registerForm = this.formbuilder.group({
    userName: new FormControl('',Validators.compose([
      Validators.required
    ])),
    userEmail: new FormControl('',Validators.compose([
      Validators.required,Validators.pattern(this.patternEmail)
    ])),
    userPassword: new FormControl('',Validators.compose([
      Validators.required
    ])),
    userConfirmPassword: new FormControl('',Validators.compose([
      Validators.required
    ])),
    userRole: new FormControl('Store Manager',Validators.compose([
      Validators.required
    ]))
  }, {validator: this.MustMatch('userPassword','userConfirmPassword')});

  loginForm = this.formbuilder.group({
    userName: new FormControl('',Validators.required),
    userPassword: new FormControl('',Validators.required)
  });

  password(){
    console.log('hi');

    this.show = !this.show;
    return this.show;
  }

  passwordconfirm(){
    console.log('hi');

    this.confirmshow = !this.confirmshow;
    return this.confirmshow;
  }

  loginPasswordShow(){
    this.loginshow = !this.loginshow;
    return this.loginshow;
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (registerForm: FormGroup) => {
        const control = registerForm.controls[controlName];
        const matchingControl = registerForm.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}


  register(){
    this.user.userName = this.registerForm.controls.userName.value;
    this.user.userEmail = this.registerForm.controls.userEmail.value;
    this.user.userPassword = this.registerForm.controls.userPassword.value;
    this.user.userRole = this.registerForm.controls.userRole.value;

    this.userService.registerUser(this.user).subscribe(data => {
      console.log(data);
      swal.fire({
         title: "Successfully Registered",
         icon: "success"
       }).then(() => window.location.reload());
      //alert('Successfully Registered');
    }, error => {
      console.log(error);
      swal.fire({
        title: "Oops!!",
        text: "Already Registered",
        icon: "warning"
      }).then(() => window.location.reload());
    //alert('Already Registered');
    });

    this.user = new UserInformation();
  }


  login(){
    this.userdto.userName = this.loginForm.controls.userName.value;
    this.userdto.userPassword = this.loginForm.controls.userPassword.value;

    this.userService.loginUser(this.userdto)
    .subscribe(data => {
      this.userRole = data;

      console.log(this.userRole);
      // swal.fire({
      //   title: "Successfully Signed In",
      //   icon: "success"
      // })
      //alert('Successfully Signed In')
      this.loginCheck(this.userRole);
      console.log(data);
    }, error => {
      console.log(error);
      swal.fire({
        title: "Oops!!",
        text: "Invalid Credentials",
        icon: "warning"
      });
      //alert('Invalid email or password')
    })
  }

  loginCheck(userRole: string){
    sessionStorage.setItem('userName',this.loginForm.controls.userName.value);
    sessionStorage.setItem('isLoggedIn','true');
    sessionStorage.setItem('token',userRole);
    this.router.navigate(['/']);
  }


}
