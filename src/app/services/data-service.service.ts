import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CountryData } from '../models/country-data';
import { GlobalDataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'https://api.covid19api.com/summary';

  constructor(private http: HttpClient) { }

  getGlobalData(){
    return this.http.get<GlobalDataSummary>(this.baseUrl).pipe(
      map(result => {
        return result['Global']
      })
    )
  }

  getCountries(){
    return this.http.get<string[]>('https://api.covid19api.com/countries').pipe(
      map(rows => {
        let countries = [];
        rows.forEach(row => {
          countries.push(row['Country']);
        })

        return countries.sort();
      })
    )
  }

  getCountryData(country: string){
    return this.http.get<[]>(`https://api.covid19api.com/total/country/${country}`).pipe(
      map(rows => {
        let countryData: CountryData[] = [];

        rows.forEach(row => {
          countryData.push({
            Active: row['Active'],
            Confirmed: row['Confirmed'],
            Deaths: row['Deaths'],
            Recovered: row['Recovered'],
            Date: row['Date']
          })
        });
        
        return countryData;
      })
    )
  }

  
}
