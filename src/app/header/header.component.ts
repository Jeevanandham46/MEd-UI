import { AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { DataShareService } from '../data-share.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,DoCheck {

  constructor(private route:Router, private dialog:MatDialog, private service:DataShareService) { }
  ngDoCheck(): void {
this.profile = this.service.profileChange
this.login = !this.service.profileChange
this.analytics = this.service.adminAnalytics
  }

  analytics:boolean = false
  ngOnInit(): void {
    
  }
  profile:boolean = false
  login:boolean = true
  toHome(){
this.route.navigate(['home']) 
 }
  toShop(){
    this.route.navigate(['shop']) 

  }
  toContact(){
    this.route.navigate(['contact'])
  }
  toAbout(){
    this.route.navigate(['about'])
  }
  toCart(){
    this.route.navigate(['cart'])
  }
  toProfile(){
    this.route.navigate(['profile'])
  }
  toAnalytics(){
    this.route.navigate(['analytics'])
  }
  toHistory(){
    this.route.navigate(['history'])

  }
  openSignUp(){
    this.dialog.open(SignupComponent,{
      width:'30%',
      height:'60%'
    })
  }

}
