import { Component, OnInit } from '@angular/core';
import { HouseDetail } from 'src/app/models/houseDetails';
import { HouseRental } from 'src/app/models/HouseRental';
import { HouseDetailService } from 'src/app/services/house-detail.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  houseRentals: HouseRental[] = [];
  userId:number;
  houseDetails: HouseDetail[];

  constructor(private rentalService:RentalService,private houseDetailService:HouseDetailService) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem("userId"))
    this.getRentals();
  }

  getRentals(){
    this.rentalService.getRentalsById(this.userId).subscribe(response=>{
      this.houseRentals = response.data;
    })
  }

}
