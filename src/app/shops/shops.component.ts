import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../data-share.service';
@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  constructor(private service:DataShareService) { }
loader:boolean = false
  ngOnInit(): void {
    this.loader = true
     this.getShopData()
  }

getShopData(){
  this.service.getShopName().subscribe((res)=>{
    this.loader = false
    console.log(res)
    this.images = res     
    let data = this.images[0]
    for(let x of data.med){
      console.log(x,'medddddd')
      x['qty'] = 0
    }
    this.shopDetailsData = data
    console.log(this.shopDetailsData,'shopDetailsData')
   })
}
shopDetails(data:any){
console.log(data)
this.shopDetailsData = []
for(let x of data.med){
  console.log(x,'medddddd')
  x['qty'] = 0
}
this.shopDetailsData = data
}

shopDetailsData:any 
  images :any =[] 
dataToCart:any
shopNameFromMed:any
medDetails:any = []
  sendSelectedData(medicine:any,shopName:any){
    console.log(this.shopNameFromMed, '=' ,medicine)
    medicine.qty = 1
    if(this.shopNameFromMed == shopName){
      this.medDetails.push(medicine)
      this.dataToCart = {
              name:this.shopNameFromMed,
              medicine:this.medDetails
        }
    }else{
      this.shopNameFromMed = shopName
      this.medDetails = []
      this.medDetails.push(medicine)
      this.dataToCart = {
              name:this.shopNameFromMed,
              medicine:this.medDetails
        }
    }
this.service.dataToCartFromShop = this.dataToCart
    this.count  = true
    console.log(this.dataToCart)

}
count = false
priceChange(data:any,price:any){
  console.log(data,price)
  if(data == 'add'){
    console.log(price)
    price.qty += 1
  }else if(data  == 'remove'){
price.qty -= 1
if(price.qty <= 0){
  
}
  }
}



}
