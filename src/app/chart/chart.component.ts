import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataShareService } from '../data-share.service';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit,OnChanges {
  Highcharts = Highcharts;
  linechart:any =  {
    series:[{data:[1,2,3,4,5],type:'line'}]
  }
  constructor(private service:DataShareService) { }
  ngOnChanges(changes: SimpleChanges): void {
if(changes['shopChart']){
  console.log(this.shopChart)
  console.log(this.medicineChart)
  console.log(this.amountChart)
  this.medShopChart()
}  
if(changes['medicineChart']){
  console.log(this.shopChart)
  console.log(this.medicineChart)
  console.log(this.amountChart)
  this.medicineChartData()
}  
if(changes['amountChart']){
  console.log(this.shopChart)
  console.log(this.medicineChart)
  console.log(this.amountChart)
  this.amountChartData()
}  
if(changes['medPieChart']){
  this.PieChart()
}
}
PieChart(){
  let data = this.medPieChart
  console.log(data,'pie')
  this.linechart = data
}
  ngOnInit(): void {
    setTimeout(()=>{
      this.medShopChart()
      this.medicineChartData()
        this.amountChartData()
        console.log(this.turnOver)
    },200)  }


  
turnOver = 0

@Input() shopChart :any
@Input() medicineChart :any
@Input() amountChart :any
@Input() medPieChart:any
  medShopChart(){
    let data = this.shopChart
    console.log(this.shopChart,'chart data')
    this.linechart = data
  }
  medicineChartData(){
    this.linechart = this.medicineChart
  }
  amountChartData(){
    this.linechart = this.amountChart
  }

}
