import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  userName: string;
  userRole: string;
  constructor() { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('userName');
    this.userRole = sessionStorage.getItem('token');
  }

  approve(){
    if(sessionStorage.getItem('token') == 'Department Manager'){
      return false;
    } else{
      return true;
    }
  }

  pendingProductStatus(){
    if(sessionStorage.getItem('token') == 'Store Manager'){
      return false;
    } else{
      return true;
    }
  }

}
