import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HouseDetail } from '../models/houseDetails';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class HouseDetailService {
  apiUrl = "https://localhost:44334/api/";
  constructor(private httpClient:HttpClient) { }

  getHouseDetails():Observable<ListResponseModel<HouseDetail>>{
    let newPath = this.apiUrl + "houses/gethousedetails";
    return this.httpClient.get<ListResponseModel<HouseDetail>>(newPath);
  }

  getHousesByCategory(categoryId:number):Observable<ListResponseModel<HouseDetail>>{
    let newPath = this.apiUrl + "houses/gethousebycategorydetaildtos?categoryId="+categoryId
    return this.httpClient.get<ListResponseModel<HouseDetail>>(newPath)
  }

  getHousesByCity(cityId:number):Observable<ListResponseModel<HouseDetail>>{
    let newPath = this.apiUrl + "houses/gethousebycityiddetaildtos?cityId="+cityId
    return this.httpClient.get<ListResponseModel<HouseDetail>>(newPath)
  }

  getHouseDetailsByHouseId(houseId:number):Observable<ListResponseModel<HouseDetail>>{
    let newPath = this.apiUrl + "houses/gethousedetailsbyhouseid?houseId="+houseId
    return this.httpClient.get<ListResponseModel<HouseDetail>>(newPath)
  }

  getHouseDetailsByFilter(categoryId:number, cityId:number):Observable<ListResponseModel<HouseDetail>>{
    let newPath = this.apiUrl + "houses/gethousedetailsbyfilter?categoryId="+categoryId+"&cityId="+cityId
    return this.httpClient.get<ListResponseModel<HouseDetail>>(newPath)
  }

}
