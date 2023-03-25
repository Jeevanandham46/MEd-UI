import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';

import { DataShareService } from '../data-share.service';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,DoCheck {

  constructor(private service:DataShareService, private dialog:MatDialog, private formbuilder:FormBuilder) { }
  ngDoCheck(): void {
    this.medData = this.service.dataToCartFromShop

  }
formData:any
  medData:any
  counter = 1
  cartEmpty = true

  ngOnInit(): void {
    this.formData = this.formbuilder.group({
      card:['',[Validators.required]],
      cvv:['',[Validators.required]]
        })
    console.log(this.service.dataToCartFromShop)
    if(this.service.dataToCartFromShop == undefined){
      this.cartEmpty  = true
    }else{
this.cartEmpty = false
    this.totalAmount = 0
    this.medData = this.service.dataToCartFromShop
    for(let x of this.medData.medicine){
      console.log(x.price)
      this.totalAmount += x.price * x.qty
    }
    this.gstAmount = (this.totalAmount * 18)/100

    this.shippingCost = (this.totalAmount * 5)/100
    this.estimatedTotal = this.totalAmount + this.gstAmount + this.shippingCost
  }
  }
  cardDetails:boolean= false
totalAmount = 0
gstAmount = 0
shippingCost = 0
estimatedTotal = 0
  priceChange(data:any,price:any){
    console.log(data,price)
    if(data == 'add'){
      console.log(price)
      price.qty += 1
      this.totalAmount += price.price
      this.gstAmount = (this.totalAmount * 18)/100
      this.shippingCost = (this.totalAmount * 5)/100
      this.estimatedTotal = this.totalAmount + this.gstAmount + this.shippingCost
      this.counter += 1
    }else if(data  == 'remove'){
      console.log(price)
      price.qty -= 1
      this.totalAmount -= price.price
      this.gstAmount = (this.totalAmount * 18)/100
      this.shippingCost = (this.totalAmount * 5)/100
      this.estimatedTotal = this.totalAmount + this.gstAmount + this.shippingCost
      this.counter -= 1
      if(this.totalAmount < 0){
        this.totalAmount = 0
      }
      if(this.counter < 0){
        this.counter = 0
      }

        if(price.qty == 0){
          let index  = this.medData.medicine.indexOf(price)
          console.log(index)
          this.medData.medicine.splice(index,1)
        }
        console.log(this.medData.medicine.length,'length')
        if(this.medData.medicine.length == 0){
          this.cartEmpty = true
        }
    }
  }

  checkOut(){
    this.cardDetails = true


  }
  errorMsg:boolean = false
  payment(){
    console.log(this.estimatedTotal,this.medData,)
    let data = {}
    let array = []
    if(this.service.userName == undefined){
      this.dialog.open(SignupComponent,{
        width:'30%',
        height:'60%'
      })
        }else{
          console.log(this.formData.status,'formdata')
          if(this.formData.status == 'VALID'){
            this.cartEmpty = true

            for (let x of this.medData.medicine){
              array.push(x.name)
            }
        data = {
          total:this.estimatedTotal,
          shopname:this.medData.name,
          medicines:array,
          username:this.service.userName
        }
        this.service.sendBill(data).subscribe({
          next:(res)=>{
            console.log(res)
            console.log(res,'formdata')
            this.cartEmpty = true
          },
          error:(err)=>{
  
          },
          complete:()=>{
  
          }
        })
        this.errorMsg = false
          }else{
            this.errorMsg = true
          }

    }
    
    console.log(data,'billdata')
  }

}
