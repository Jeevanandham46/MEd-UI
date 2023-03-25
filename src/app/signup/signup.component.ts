import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { DataShareService } from '../data-share.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private formbuilder:FormBuilder, private service:DataShareService, private http:HttpClient, private dialog:MatDialog) { }
formData:any

formDataReg:any
ngOnInit(): void {
  localStorage.setItem('email','jeeva@gmail.com')
    localStorage.setItem('password','Jeeva@123')
    localStorage.setItem('name','Jeeva')
    this.formData = this.formbuilder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
        })
        this.formDataReg = this.formbuilder.group({
          username:['',[Validators.required]],
          email:['',[Validators.required]],
          password:['',[Validators.required]]
            })
  }

  userBorder='red'
  passwordBorder='black'
  emailBorder='black'

userNameCheck(){

}
emailCheck(){

}
passwordCheck(){

}
register:boolean = false
changeForm(data:any){
  console.log(data)
  if(data == 'reg'){
this.register =true
  }else{
    this.register = false
  }
}
errorMsg:boolean = false
errorMsgReg:boolean = false
  formDataSend(){
    console.log(localStorage.getItem('email'),localStorage.getItem('password'))
    if(localStorage.getItem('email') == this.formData.value.email && localStorage.getItem('password') == this.formData.value.password){
      this.service.adminAnalytics = true
      this.service.profileChange = true
      this.service.userName = localStorage.getItem('email')
      this.service.nameFromSignIn = localStorage.getItem('name')
      this.service.emailFromSignIn =  localStorage.getItem('email')
      this.service.nameForHistory = localStorage.getItem('email')

      this.dialog.closeAll()
    }else if(this.formData.status == 'VALID'){
      console.log(this.formData.value)
      this.service.sendLoginData(this.formData.value).subscribe({
        next:(res)=>{  
          this.errorMsg = false
          console.log(res,'valid')
          let data = res as any
          this.service.userName = data.email
          this.service.nameForHistory = data.email
          this.service.nameFromSignIn  = data.username
          this.service.emailFromSignIn = data.email
          this.service.profileChange = true
          this.dialog.closeAll()
        },
        error:(err) =>{
         this.errorMsg = true
         setTimeout(()=>{
          this.errorMsg = false
         },2000)
        },
        complete:()=>{

        }
      }
      )
    }
  }
  formDataSendReg(){
    if(this.formDataReg.status == 'VALID'){
      console.log(this.formDataReg.value)
      this.service.sendRegisterData(this.formDataReg.value).subscribe({
        next:(res)=>{  
          this.errorMsg = false
          console.log(res,'valid')
          let data = res as any
          this.service.userName = data.email
          this.service.nameForHistory = data.email
          this.service.nameFromSignIn  = data.username
          this.service.emailFromSignIn = data.email
          this.service.profileChange = true
          this.dialog.closeAll()
        },
        error:(err) =>{
         this.errorMsgReg = true
         setTimeout(()=>{
          this.errorMsgReg = false
         },2000)
        },
        complete:()=>{

        }
      }
      )
    }
  }

}
