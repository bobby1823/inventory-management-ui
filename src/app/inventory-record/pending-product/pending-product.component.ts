import { Component, OnInit } from '@angular/core';
import { InventoryDto } from '../inventoryDto';
import { InventoryService } from '../../services/inventory.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-pending-product',
  templateUrl: './pending-product.component.html',
  styleUrls: ['./pending-product.component.scss']
})
export class PendingProductComponent implements OnInit {

  products: InventoryDto[] = [];
  fetchedData: boolean = false;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    this.inventoryService.getPendingProducts().subscribe(data => {
      console.log(data);

      this.products = data;
    }, error => {
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

  approveProduct(productId: number){
    this.inventoryService.approveProducts(productId).subscribe(data => {
      console.log(data);
      swal.fire({
        // title: "Oops!!",
        // text: "Invalid email or password",
        // icon: "warning",
        title: "Product Approved",
        icon: "success"
      }).then(() => window.location.reload());
    }, error => {
      swal.fire({
        title: "Oops!!",
        text: "Unable to approve the Product",
        icon: "warning",
      }).then(() => window.location.reload());
    })
  }

}
