import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  apiUrl = "https://localhost:44334/api/cities/getall"

  constructor(private httpClient: HttpClient) { }

  getCities():Observable<ListResponseModel<City>>{
    return this.httpClient.get<ListResponseModel<City>>(this.apiUrl);
  }
}
