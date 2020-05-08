import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  login(){
    return sessionStorage.getItem('isLoggedIn');
  }

  logout(): void {
    console.log("Logout");
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('productId');
    this.router.navigate(['/'])
  }

}
