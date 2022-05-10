import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoggedUserService } from 'src/app/services/logged-user.service';
import { StorageTokenService } from 'src/app/services/storage-token.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private loggedUserService:LoggedUserService,private tokenService:StorageTokenService) { }
  adsoyad:string;
  ad:string;
  showNav:boolean;
  expiremin:number;
  ngOnInit(): void {
    setInterval(()=>{
      this.ad = localStorage.getItem("ad")
    },1000)
  }
  getName(){
    localStorage.getItem("ad")
  }
  logout(){
    localStorage.clear();
    this.ad = null;
  }
  /*renewToken(){
    this.loggedUserService.renewToken().subscribe(response=>{
      if(response.success){
        console.log(response);  
        this.tokenService.addToken(response.data);
        this.tokenBitisSuresi();
      }
    })
  }
  tokenBitisSuresi(){
    let currentDate = Date.now();
    let expireDate = new Date(this.tokenService.getToken().expiration);
    this.expiremin =  Math.round((expireDate.getTime()-currentDate)/1000/60);
    if(this.expiremin < 3 && this.expiremin > 0){
      this.renewToken();
    }

  }*/
}