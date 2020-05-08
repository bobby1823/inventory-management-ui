import { Component, OnInit } from '@angular/core';
import { InventoryDto } from '../inventoryDto';
import { InventoryService } from '../../services/inventory.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products: InventoryDto[] = [];
  fetchedData: boolean = false;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {

    this.inventoryService.getAllProducts().subscribe(data => {
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

  deleteProductBySM(productId: number){
    this.inventoryService.deleteProductBySM(productId).subscribe(data => {
      console.log(data);
      swal.fire({
        // title: "Oops!!",
        // text: "Invalid email or password",
        // icon: "warning",
        title: "Product Deleted",
        icon: "success"
      }).then(() => window.location.reload());
    }, error => {
      console.log(error);
      swal.fire({
        title: "Oops!!",
        text: "Unable to delete the Product",
        icon: "warning",
      }).then(() => window.location.reload());
    })
  }

}

