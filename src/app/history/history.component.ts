import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../data-share.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private service:DataShareService) { }
nameOfUser:any
  ngOnInit(): void {
    this.nameOfUser = this.service.nameForHistory
if(this.nameOfUser != undefined || null){
  this.getBillData()
  this.noData = false
}else{
this.noData = true
}

  }

  dataOfhistory:any  = []
noData:boolean = false
  getBillData(){
    this.service.getBilldata().subscribe({
      next:(res)=>{
        console.log(res)
        let data = res as any
        for(let x of data ){
            if(x.username == this.nameOfUser){
              this.dataOfhistory.push(x)
              console.log(this.dataOfhistory)
            }
        }
      },
      error:()=>{

      }
    })
  }

}
