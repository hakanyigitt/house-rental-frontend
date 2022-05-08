import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities: City[] = [];
  dataLoaded = false;
  currentCity?:City;
  cityFilterText="";

  constructor(private cityService:CityService) { }

  ngOnInit(): void {
    this.getCities();
  }

  getCities(){
    this.cityService.getCities().subscribe(response=>{
      this.cities = response.data
      this.dataLoaded = true;
    })
  }

  setCurrentCity(city:City){
    this.currentCity = city;
  }

  setDeletedCurrentCity(){
    this.currentCity = undefined;
  }

  getCurrentCityClass(city: City){
    if(city == this.currentCity){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  getAllCityClass(){
    if(!this.currentCity){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
}
