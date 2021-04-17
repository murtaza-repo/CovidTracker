import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { CountryData } from 'src/app/models/country-data';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: string[] = [];
  countryData: CountryData[] = [];
  currentData: CountryData;
  isLoading = false;

  lineChart: GoogleChartInterface;

  constructor(private dataService: DataService) {
    this.dataService.getCountries().subscribe({
      next: result => { this.countries = result; }
    })
  }

  ngOnInit(){
    
  }

  updateCountry(country: string){
    this.isLoading = true;
    this.dataService.getCountryData(country).subscribe({
      next: result => {
        this.countryData = result.filter(res => res['Confirmed'] > 0);
        this.currentData = result[result.length -1];
      },
      complete:() => {
        this.isLoading = false;
        this.initChart(country)
      }
    })
    
  }

  initChart(country: string){
    let dataTable = [];
    dataTable.push(["Date", 'Active', 'Confirmed', 'Deaths', 'Recovered'])
    
    this.countryData.forEach(data => {
      dataTable.push([data.Date.substring(0,10), data.Active, data.Confirmed, data.Deaths, data.Recovered])
    })

    this.lineChart = {
      chartType: 'LineChart',
      dataTable: dataTable,
      options:{ 
        title: `Covid-19 Cases in ${country}`, 
        height: 500, hAxis: {title: 'Dates'}, 
        vAxis:{title: 'Cases'},
        animation: { duration: 250 }
      }
    }
  }

}
