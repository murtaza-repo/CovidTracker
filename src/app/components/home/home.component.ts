import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataService } from 'src/app/services/data-service.service';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService) { }

  globalData: GlobalDataSummary;
  isLoading: boolean = true;

  pieChartNew: GoogleChartInterface;
  barChartNew: GoogleChartInterface;

  pieChartTotal: GoogleChartInterface;
  barChartTotal: GoogleChartInterface;

  ngOnInit(){
    this.dataService.getGlobalData().subscribe({
      next: result => { this.globalData = result; },
      complete: () => { 
        this.isLoading = false;
        this.initNewChart();
        this.initTotalChart();
      },
      error: res => { console.log(res)}
    })
  }

  initNewChart(){
    this.pieChartNew = {
      chartType: 'PieChart',
      dataTable: [
        ['Global', 'Cases'],
        ['New Confirmed', this.globalData.NewConfirmed],
        ['New Deaths', this.globalData.NewDeaths],
        ['New Recovered', this.globalData.NewRecovered]
      ],
      options: {title: 'Global New Cases', height: 400}
    }

    this.barChartNew = {
      chartType: 'BarChart',
      dataTable: [
        ['Global', 'Cases'],
        ['New Confirmed', this.globalData.NewConfirmed],
        ['New Deaths', this.globalData.NewDeaths],
        ['New Recovered', this.globalData.NewRecovered]
      ],
      options: {title: 'Global New Cases', height: 400 }
    }
  }

  initTotalChart(){
    this.pieChartTotal = {
      chartType: 'PieChart',
      dataTable: [
        ['Global', 'Cases'],  
        ['Total Confirmed', this.globalData.TotalConfirmed],
        ['Total Deaths', this.globalData.TotalDeaths],
        ['Total Recovered', this.globalData.TotalRecovered]
      ],
      options: {title: 'Global Total Cases', height: 400}
    }

    this.barChartTotal = {
      chartType: 'BarChart',
      dataTable: [
        ['Global', 'Cases'],  
        ['Total Confirmed', this.globalData.TotalConfirmed],
        ['Total Deaths', this.globalData.TotalDeaths],
        ['Total Recovered', this.globalData.TotalRecovered]
      ],
      options: {title: 'Global Total Cases', height: 400 }
    }
  }
}
