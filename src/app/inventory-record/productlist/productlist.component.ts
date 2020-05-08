import { Component, OnInit } from '@angular/core';
import { InventoryDto } from '../inventoryDto';
import { InventoryService } from '../../services/inventory.service';
import swal from 'sweetAlert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

  products: InventoryDto[] = [];
  fetchedData: boolean = false;
  constructor(private inventoryService: InventoryService, private router: Router) { }

  ngOnInit() {
    this.inventoryService.getProducts().subscribe(data => {
      console.log(data);
      this.products = data;
      
    }, error => {
      console.log(error);
      //this.products = error;
      if(this.products.length == 0){
        this.fetchedData = true;
      }
    });
  }

  deleteProduct(productId: number){
    this.inventoryService.deleteProduct(productId).subscribe(data => {
      console.log(data);
      swal({
        // title: "Oops!!",
        // text: "Invalid email or password",
        // icon: "warning",
        title: "Product Deleted",
        icon: "success"
      }).then(() => window.location.reload()); 
    }, error => {
      console.log(error);
      swal({
        title: "Oops!!",
        text: "Unable to delete the Product",
        icon: "warning",
      }).then(() => window.location.reload()); 
      
    })
  }

  departmentManager(){
    if(sessionStorage.getItem('token') == 'Department Manager'){
      return true;
    } else {
      return false;
    }
  }

  storeManager(){
    if(sessionStorage.getItem('token') == 'Store Manager'){
      return true;
    } else {
      return false;
    }
  }

  deleteProductBySM(productId: number){
    this.inventoryService.deleteProductBySM(productId).subscribe(data => {
      console.log(data);
      swal({
        // title: "Oops!!",
        // text: "Invalid email or password",
        // icon: "warning",
        title: "Product Deleted",
        icon: "success"
      }).then(() => window.location.reload()); 
    }, error => {
      console.log(error);
      swal({
        title: "Oops!!",
        text: "Unable to delete the Product",
        icon: "warning",
      }).then(() => window.location.reload()); 
    })
  }

  update(productId: any){
    sessionStorage.setItem('productId',productId)
    console.log(sessionStorage.getItem('productId'));
    this.router.navigate(['/inventory/update'])
  }

}
