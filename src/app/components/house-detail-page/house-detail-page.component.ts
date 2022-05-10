import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseDetail } from 'src/app/models/houseDetails';
import { HouseDetailService } from 'src/app/services/house-detail.service';

@Component({
  selector: 'app-house-detail-page',
  templateUrl: './house-detail-page.component.html',
  styleUrls: ['./house-detail-page.component.css']
})
export class HouseDetailPageComponent implements OnInit {
  houseDetails: HouseDetail[] = [];
  dataLoaded = false;
  defaultLink = "Images/DefaultHouse.jpg";
  houseImages:string[];
  imgBaseUrl: string = 'https://localhost:44334/';
  constructor(private houseDetailService:HouseDetailService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["houseId"]){
        this.getHouseDetailsByHouseId(params["houseId"])
      }
    });
  }

  getHouseDetailsByHouseId(houseId:number){
    this.houseDetailService.getHouseDetailsByHouseId(houseId).subscribe(response=>{
      this.houseDetails = response.data;

      this.houseImages =  this.houseDetails[0].houseImagePath;
      if(this.houseImages.length == 0){
        this.houseImages[0] = this.defaultLink;
      }
      this.dataLoaded = true;
    })
  }

  getCurrentImageClass(image: string) {
    if (image == this.houseImages[0]) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  getButtonClass(image: string) {
    if (image == this.houseImages[0]) {
      return 'active';
    } else {
      return '';
    }
  }

}
