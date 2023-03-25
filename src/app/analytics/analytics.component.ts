import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../data-share.service';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  loader:boolean = false
  constructor(private service:DataShareService) { }

  ngOnInit(): void {
    this.loader = true
    this.getBillDataFromJson()
  }
  medicalChart:any
  medicineChart:any
  amountChart:any
  medPieChart:any
  turnOver :any
  yDataNAme:any = []
  dollar = 0
  euro=0
  getBillDataFromJson(){
    this.service.getBilldata().subscribe({
      next:(res: any)=>{
        
       
          this.loader = false
       
        let shopX = []
        let medX = []
        let amountX = []
        let totalturnOver = 0 
        let data = res as any
        for(let x of data){
          console.log(x.total,'shopx for')
          shopX.push(x.shopname)
              for(let j of x.medicines){
          
          medX.push(j)
          
              }
              this.turnOver += x.total
              this.totalAmountData += x.total
          }
          this.turnOver = '₹' + parseFloat(this.totalAmountData.toFixed(2))
          this.euro = this.totalAmountData / 81.59
          this.dollar = this.totalAmountData / 82.73

        console.log(this.turnOver,'shopx')
        let arrayShopSeries = []
        let arrayXaxisShop = []
        const counts: any = {};
        let arrayMedSeries = []
        let arrayXaxismed = []
        const countsMed: any = {};
        shopX.forEach(function (x: any) { counts[x] = (counts[x] || 0) + 1; });

        for (const [key, value] of Object.entries(counts)) {
          arrayXaxisShop.push(key)
          arrayShopSeries.push(value)

        }
        medX.forEach(function (x: any) { countsMed[x] = (countsMed[x] || 0) + 1; });
        for (const [key, value] of Object.entries(countsMed)) {
          arrayXaxismed.push(key)
          arrayMedSeries.push(value)
          this.yDataNAme.push({y:value,name:key})

        }


        
        let dataArray:any = []
        let arrayAmountXaxis:any = []
        let arrayAmountSeries:any = []
        for(let x of data){
          console.log(x,'forloopx')
          
         // arrayAmountSeries.push(x.total)
          dataArray.push(x.shopname)
          //dataArray.push()
        }
                const counntsAmount:any = {}
                dataArray.forEach(function (x: any) { counntsAmount[x] = (counntsAmount[x] || 0) + 1; });
        for (const [key, value] of Object.entries(counntsAmount)) {
          console.log(key,value,'trex')
          arrayAmountXaxis.push(key)
        }
        let amountArray = []
        let amt = 0
        //console.log(arrayAmountXaxis,data,'worked one')
        for(let j of arrayAmountXaxis){
          amt = 0
          for(let g of data){

            if(j == g.shopname){
              console.log(j,'=',g.shopname,amt,'worked j = g')
            amt += g.total
              
            }
          }
                     console.log(amt,'worked amt')

                     arrayAmountSeries.push(amt)
          }
        console.log(counts,'counts')
        this.medicalChart = {
          title:{

            text:'Medical Shop'
          },
          xAxis:{
            categories:arrayXaxisShop
          },
          tooltip:{
            borderColor:'#fff',
            backgroundColor:'#fff',
            headerFormat: 'Name : {point.key} <br> Bookings : {point.y} ',
            pointFormat: '',
        footerFormat: '',
          },
          yAxis:{
            title:{
              text:'No of Booked'
            }
          },
          credits:{
            text:''
          },
          series:[
            {
              name:'Med Shop',
              color:'#3f51b5',
              showInLegend:false,
              type:'column',
              data:arrayShopSeries
            }
          ]
        }
        console.log(this.medicalChart,'medicalChart')
        this.medicineChart = {
          title:{

            text:'Medicines'
          },
          xAxis:{
            categories:arrayXaxismed
          },
          tooltip:{
            borderColor:'#fff',
            backgroundColor:'#fff',
            headerFormat: 'Name : {point.key} <br> Bookings : {point.y} ',
            pointFormat: '',
            footerFormat: '',
          },
          yAxis:{
            title:{
              text:'No of Booked'
            }
          },
          credits:{
            text:''
          },          
          series:[
            {
              name:'Shop',
              type:'line',
              color:'red',
              showInLegend:false,
              data:arrayMedSeries
            }
          ]
        }
        this.amountChart = {
          title:{
            text:'Most Earning'
          },
          credits:{
            text:''
          },
          xAxis:{
            categories:arrayAmountXaxis
          },
          yAxis:{
            title:{
              text:'Money'
            }
          },
          tooltip:{
            borderColor:'#fff',
            backgroundColor:'#fff',
            headerFormat: 'Name : {point.key} <br> Amount : ₹ {point.y} ',
            pointFormat: '',
            footerFormat: '',
          },
          series:[
            {
              name:'Amount',
              type:'column',
              color:'rgb(22,95,250)',
              showInLegend:false,
              data:arrayAmountSeries
            },
            {
              name:'Amount',
              type:'line',
              color:'rgb(255,115,36)',
              showInLegend:false,
              data:arrayAmountSeries
            }
          ]
        }
        this.medPieChart = {
          title:{

            text:'Medicines'
          },
          xAxis:{
            categories:arrayXaxismed
          },
          legend:{
            align: 'right',
            layout: 'vertical',
            verticalAlign: 'middle'
          },
          tooltip:{
            borderColor:'#fff',
            backgroundColor:'#fff',
            headerFormat: 'Name : {point.key} <br> Bookings : {point.y} ',
            pointFormat: '',
            footerFormat: '',
          },
          yAxis:{
            title:{
              text:'No of Booked'
            }
          },
          credits:{
            text:''
          },          
          series:[
            {
              name:'sjop',
              type:'pie',
              color:'red',
              showInLegend:true,
              data:this.yDataNAme
            },
          ]
        }
        console.log(this.amountChart)
      },
      error:(err: any)=>{

      },
      complete:()=>{

      }
    })
  }


totalAmountData = 0
  changeMoney(data:any){
    let money = this.turnOver
    if(data == 'INR'){
        this.turnOver = '₹ ' + parseFloat(this.totalAmountData.toFixed(2))
    }else if(data == 'EURO'){
      money = money / 81.59
      this.turnOver = '€ '+  parseFloat(this.euro.toFixed(2))

    }else if (data == 'USD'){
      money = money / 82.73
      this.turnOver = '$ '+ parseFloat(this.dollar.toFixed(2))
    }
  }

}
