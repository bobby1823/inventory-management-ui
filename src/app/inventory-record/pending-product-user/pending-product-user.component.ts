import { Component, OnInit } from '@angular/core';
import { InventoryDto } from '../inventoryDto';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-pending-product-user',
  templateUrl: './pending-product-user.component.html',
  styleUrls: ['./pending-product-user.component.scss']
})
export class PendingProductUserComponent implements OnInit {

  products: InventoryDto[] = [];
  fetchedData: boolean = false;
  
  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    this.inventoryService.pendingProductUser().subscribe(data => {
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

}
