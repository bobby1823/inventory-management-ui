import { Component, OnInit } from '@angular/core';
import { Inventory } from '../InventoryRecord';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {


  inventory = new Inventory();
  productNamePattern = /^([a-zA-Z]+(\s)?)*[a-zA-Z0-9]+(\s)?$/;
  numberPattern = /^([1-9][0-9]*)$/;
  namePattern = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
  //datePattern = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  constructor(private formbuilder: FormBuilder, private inventoryService: InventoryService) { }

  ngOnInit() {
  }

  addForm = this.formbuilder.group({
    productName: new FormControl('', Validators.compose([
      Validators.required, Validators.pattern(this.productNamePattern)
    ])),
    vendor: new FormControl('', Validators.compose([
      Validators.required, Validators.pattern(this.namePattern)
    ])),
    productMrp: new FormControl('', Validators.compose([
      Validators.required, Validators.pattern(this.numberPattern)
    ])),
    batchNumber: new FormControl('',Validators.compose([
      Validators.required, Validators.pattern(this.numberPattern)
    ])),
    batchDate: new FormControl('',Validators.compose([
      Validators.required, //Validators.pattern(this.datePattern)
    ])),
    quantity: new FormControl('',Validators.compose([
      Validators.required, Validators.pattern(this.numberPattern)
    ]))
  });

  addProduct(){
    this.inventory.productName = this.addForm.controls.productName.value;
    this.inventory.vendor = this.addForm.controls.vendor.value;
    this.inventory.productMrp = this.addForm.controls.productMrp.value;
    this.inventory.batchNumber = this.addForm.controls.batchNumber.value;
    this.inventory.batchDate = this.addForm.controls.batchDate.value;
    this.inventory.quantity = this.addForm.controls.quantity.value;
    console.log(this.inventory);
    this.inventoryService.addProducts(this.inventory).subscribe(data =>{
      console.log(data);
      swal.fire({

        title: "Product Successfully Added",
        icon: "success"
      }).then(() => window.location.reload());

    }, error => {
      console.log(error);
    })
  }

}
