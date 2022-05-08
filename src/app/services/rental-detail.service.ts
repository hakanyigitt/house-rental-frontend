import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetails } from '../models/rentalDetails';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailService {

  apiUrl="https://localhost:44334/api/"
  constructor(private httpClient:HttpClient) { }

  getRentalDetails():Observable<ListResponseModel<RentalDetails>>{
    let newPath = this.apiUrl + "houserentals/getrentaldetails"
    return this.httpClient.get<ListResponseModel<RentalDetails>>(newPath);
  }

  checkIfCanHouseBeRentedBetweenSelectedDates(houseId:number, rentDate:string, returnDate:string):Observable<SingleResponseModel<boolean>>{
    let newPath = this.apiUrl + "houserentals/checkifcanhouseberentedbetweenselecteddates?houseId=" + houseId + "&rentDate=" + rentDate + "&returnDate=" + returnDate
    return this.httpClient.get<SingleResponseModel<boolean>>(newPath);
  }
}
