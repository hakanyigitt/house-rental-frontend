import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  constructor(private httpClient: HttpClient) { }
  
  getName():Observable<SingleResponseModel<string>>{
    let apiLink = environment.apiUrl+"loggeduser/adsoyad";
    return this.httpClient.get<SingleResponseModel<string>>(apiLink);
  }

}
