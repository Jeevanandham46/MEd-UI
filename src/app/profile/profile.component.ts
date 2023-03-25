import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../data-share.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


userName:any
userEmail:any

  constructor(private service:DataShareService,private router:Router) { }

  ngOnInit(): void {
    this.userEmail = this.service.emailFromSignIn
    this.userName = this.service.nameFromSignIn
    console.log(this.userEmail,this.userName)
    if(this.userEmail == undefined||null){
      this.router.navigate(['home'])
    }
  }

}
