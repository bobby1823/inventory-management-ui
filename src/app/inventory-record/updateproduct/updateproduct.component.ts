import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { InventoryDto } from '../inventoryDto';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.scss']
})
export class UpdateproductComponent implements OnInit {

  productId: any
  inventory = new InventoryDto();
  productNamePattern = /^([a-zA-Z]+(\s)?)*[a-zA-Z0-9]+(\s)?$/;
  numberPattern = /^([1-9][0-9]*)$/;
  namePattern = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
  datePattern = /^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\d{4}$/i;
  constructor(private formbuilder: FormBuilder, private inventoryService: InventoryService,private router:Router) { }

  ngOnInit() {

    this.productId = sessionStorage.getItem('productId');
    console.log(this.productId);
    this.inventoryService.productById().subscribe(data => {
      this.inventory = data;
    }, error => {
      console.log(error);

    })


  }

  updateForm = this.formbuilder.group({
    productName: new FormControl('', Validators.compose([
       Validators.pattern(this.productNamePattern)
    ])),
    vendor: new FormControl('', Validators.compose([
      Validators.pattern(this.namePattern)
    ])),
    productMrp: new FormControl('', Validators.compose([
      Validators.pattern(this.numberPattern)
    ])),
    batchNumber: new FormControl('',Validators.compose([
      Validators.pattern(this.numberPattern)
    ])),
    batchDate: new FormControl('',Validators.compose([
      Validators.pattern(this.datePattern)
    ])),
    quantity: new FormControl('',Validators.compose([
      Validators.pattern(this.numberPattern)
    ]))
  });

  updateProduct(event){
    event.preventDefault();
    const target = event.target;
    this.inventory.productName = target.querySelector('#pName').value;
    this.inventory.vendor = target.querySelector('#vendorName').value;
    this.inventory.productMrp = target.querySelector('#productPrice').value;
    this.inventory.batchNumber = target.querySelector('#productBatch').value;
    this.inventory.batchDate = target.querySelector('#productBatchDate').value;
    this.inventory.quantity = target.querySelector('#quantityCount').value;
    this.inventory.productId = this.productId;
    this.inventory.userName = sessionStorage.getItem('userName');
    console.log(this.inventory);
    this.inventoryService.updateProduct(this.inventory).subscribe(data => {
      swal.fire({
        title: "Product Updated",
        icon: "success"
      }).then(() => this.router.navigate(['/inventory']));
    }, error => {
      swal.fire({
        title: "Oops!!",
        text: "Unable to update the Product",
        icon: "warning",
      }).then(() => window.location.reload());
    })

  }

}
