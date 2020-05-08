import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loggedIn(){
    return sessionStorage.getItem('isLoggedIn');
  }

  adminlogin(){
    if(sessionStorage.getItem('isLoggedIn')){
      if(sessionStorage.getItem('token') == 'Store Manager'){
        return true;
      }
      else {
        return false;
      }
    } else {
      return false;
    }
  }

}
