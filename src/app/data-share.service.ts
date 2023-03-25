import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataShareService {
profileChange:boolean = false
adminAnalytics:boolean  = false
userName:any
dataToCartFromShop:any
nameFromSignIn:any
emailFromSignIn:any
nameForHistory:any
  constructor(private http:HttpClient) { }
apiUrl = 'http://localhost:1000'
getShopName(){
  console.log('hitted')
   return this.http.get(this.apiUrl+'/data')
}


sendLoginData(data:any){
  console.log(data,'services')
 return this.http.post(this.apiUrl+'/login',data)
}


sendRegisterData(data:any){
  console.log(data,'services')
 return this.http.post(this.apiUrl+'/register',data)
}


sendBill(data:any){
  return this.http.post(this.apiUrl+'/bill',data)
}
getBilldata(){
  return this.http.get(this.apiUrl+'/getbill')
}

forChatBot(){
  return this.http.get(this.apiUrl+'/bot')
}

}
