import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HouseRental } from '../models/HouseRental';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rentals';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient:HttpClient) { }
    getRentals():Observable<ListResponseModel<Rental>>{
      let apiLink = environment.apiUrl+"houserentals/getall";
      return this.httpClient.get<ListResponseModel<Rental>>(apiLink);
    }
    add(rental:Rental):Observable<ResponseModel>{
      let apiLink = environment.apiUrl+"houserentals/add";
      return this.httpClient.post<ResponseModel>(apiLink,rental);
    }
    getRentalsById(userId:number):Observable<ListResponseModel<HouseRental>>{
      let apiLink = environment.apiUrl+"houserentals/getallbyid?id="+userId;
      return this.httpClient.get<ListResponseModel<HouseRental>>(apiLink);
    }
}