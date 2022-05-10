import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { StorageTokenService } from './storage-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44334/api/";

  constructor(private httpClient:HttpClient, private storageTokenService:StorageTokenService) { }
  login(loginModel:LoginModel){
    let apiLink = environment.apiUrl+"auth/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(apiLink,loginModel);
  }
  register(registerModel:RegisterModel){
    let apiLink = environment.apiUrl+"auth/register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(apiLink,registerModel);
  }

  isAuth():boolean {
    let date = localStorage.getItem("expire");
    console.log(date);
      if(localStorage.getItem("token") != undefined && date != undefined){
        let date2:Date = new Date(date);
        console.log(date2);
        console.log(date2.getTime());
        console.log(Date.now());
        if(date2.getTime() > Date.now()){
          console.log("Token aktif");
          return true;
        }
      }
      return false;
  }
  logout(){
    this.storageTokenService.removeToken();
  }

  
}
