import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HouseRental } from 'src/app/models/HouseRental';
import { LoggedUserService } from 'src/app/services/logged-user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentalAddForm:FormGroup;
  totalPrice:number;
  houseName:string;
  rentalDateStr:string;
  returnDateStr:string;
  rentalDate:Date;
  returnDate:Date;
  dayToStay:number;
  houseId:number;
  userId:number;
  houseRental:HouseRental;
  constructor(private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder,private toastrService:ToastrService,private loggedUserService:LoggedUserService) { }

  ngOnInit(): void {
    this.totalPrice = Number(localStorage.getItem("totalPrice"));
    this.houseName = localStorage.getItem("houseName");
    this.rentalDateStr = localStorage.getItem("rentalDate");
    this.rentalDate = new Date(this.rentalDateStr);
    this.returnDateStr = localStorage.getItem("returnDate");
    this.returnDate = new Date(this.returnDateStr);
    this.dayToStay = Number(localStorage.getItem("dayToStay"));
    this.houseId = Number(localStorage.getItem("houseId"));
    this.userId = Number(localStorage.getItem("userId"));
    this.houseRental = {houseId: this.houseId, userId: this.userId, dayToStay :this.dayToStay, totalPrice :this.totalPrice, rentalDate:this.rentalDate, endDate:this.returnDate}
  }

  add(){
    if(this.houseId){  
      this.loggedUserService.rentHouse(this.houseRental).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
      },responseError=>{
        console.log(responseError);
        if(responseError.error.message != undefined){
          this.toastrService.error(responseError.error.message);
        }
        if(responseError.error.Errors.length > 0){
            for(let i=0;i<responseError.error.Errors.length;i++){
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Hata oluştu");
            }
        }
      })
    }else{
      this.toastrService.error(environment.formnotvalidmessage,environment.formnotvalidtitle);
    }
  }
}
