import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'houseRental';
  showMenu:boolean = true;
  constructor(private router:Router) {}
  ngOnInit(): void {
    this.router.events.subscribe(val=>{
      if(val instanceof NavigationEnd){
        console.log(this.router.url);
        if(this.router.url == '/login' ||this.router.url == '/register'){
          this.showMenu = false;
        }else{
          this.showMenu = true;
        }
      }
    })
  }
}
