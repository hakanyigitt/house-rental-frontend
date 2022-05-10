import { Component, OnInit } from '@angular/core';
import { userInfoDto } from 'src/app/models/userInfoDto';
import { LoggedUserService } from 'src/app/services/logged-user.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firstName:string;
  lastName:string;
  email:string;

  constructor(private loggedUserService:LoggedUserService) { }
  
  ngOnInit(): void {
    this.firstName = localStorage.getItem("firstName")
    this.lastName = localStorage.getItem("lastName");
    this.email = localStorage.getItem("email");
  }
  
}
