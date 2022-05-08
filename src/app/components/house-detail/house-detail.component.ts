import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { City } from 'src/app/models/city';
import { HouseDetail } from 'src/app/models/houseDetails';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { CategoryService } from 'src/app/services/category.service';
import { CityService } from 'src/app/services/city.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { HouseDetailService } from 'src/app/services/house-detail.service';
import { RentalDetailService } from 'src/app/services/rental-detail.service';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
  houseDetails: HouseDetail[] = [];
  dataLoaded = false;
  currentHouse: HouseDetail;
  imgBaseUrl: string = 'https://localhost:44334/';
  houseFilterText="";
  categories: Category[]=[];
  cities: City[]=[];
  selectedCategoryId: number=0;
  selectedCityId: number=0;
  selectedHouseForRental: HouseDetail;
  rentalDate: string;
  returnDate: string;

  validateRentalDates: boolean = false;
  rentalPeriod:number;
  rentalConfirmation: SingleResponseModel<boolean>;
  constructor(
    private houseDetailService: HouseDetailService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private cityService: CityService,
    private dateTimeService: DateTimeService,
    private rentalDetailService:RentalDetailService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getHousesByCategory(params["categoryId"])
      }else if(params["cityId"]){
        this.getHousesByCity(params["cityId"])
      }else{
        this.rentalDate = undefined!
        this.returnDate = undefined!
        this.validateRentalDates = false
        this.rentalPeriod = undefined!
        this.rentalConfirmation = undefined!
        this.getHouseDetails()
        this.getCategories()
        this.getCities()
      }
    })
  }

  filter(){
    if(this.selectedCategoryId == 0 && this.selectedCityId == 0){
      this.getHouseDetails()
    }
    else if(this.selectedCategoryId == 0){
      this.getHousesByCity(this.selectedCityId)
    }
    else if(this.selectedCityId == 0){
      this.getHousesByCategory(this.selectedCategoryId)
    }
    else{
      this.getHouseDetailsByFilter(this.selectedCategoryId,this.selectedCityId)
    }
  }

  clearFilter(){
    this.selectedCategoryId = 0;
    this.selectedCityId = 0;
    this.getHouseDetails()
  }

  getHouseDetails() {
    this.houseDetailService.getHouseDetails().subscribe(response => {
      this.houseDetails = response.data;
      this.dataLoaded = true;
    });
  }
  
  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response.data;
    })
  }

  getCities(){
    this.cityService.getCities().subscribe(response=>{
      this.cities = response.data;
    })
  }

  getHousesByCategory(categoryId: number) {
    this.houseDetailService.getHousesByCategory(categoryId).subscribe(response => {
      this.houseDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getHousesByCity(cityId: number) {
    this.houseDetailService.getHousesByCity(cityId).subscribe(response => {
      this.houseDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getHouseDetailsByFilter(categoryId:number,cityId:number){
    this.houseDetailService.getHouseDetailsByFilter(categoryId,cityId).subscribe(response=>{
      this.houseDetails = response.data;
    })
  }

  getCurrentHouseClass(houseDetail: HouseDetail) {
    this.currentHouse = houseDetail;
  }

  setCurrentHouseImageSrc() {
    if(this.currentHouse.houseImagePath[0]){
      return this.imgBaseUrl + this.currentHouse.houseImagePath[0];
    }else{
      return "https://localhost:44334/Images/DefaultHouse.jpg";
    }
  }

  setCurrentHouseImageAlt() {
    return this.currentHouse.houseName;
  }

  getSelectedHouseForRental(houseDetail:HouseDetail){
    this.selectedHouseForRental = houseDetail;
  }

  getSelectedHouseForRentalImageSrc(){
    return this.imgBaseUrl + this.selectedHouseForRental.houseImagePath[0];
  }

  getDateNow(){
    return this.dateTimeService.getDateNow();
  }

  addDayToDate(date:Date, addedDay:number){
    return this.dateTimeService.addDayToDate(date, addedDay);
  }

  convertStringToDate(dateString:string){
    return this.dateTimeService.convertStringToDate(dateString);
  }

  validateReservationDates(rentDate: string, returnDate: string) {
    if (!rentDate || !returnDate) {
      return;
    }
    let newRentDate = this.convertStringToDate(rentDate);
    let newReturnDate = this.convertStringToDate(returnDate);
    if (newRentDate >= newReturnDate) {
      this.validateRentalDates = false;
    } else {
      this.validateRentalDates = true;
    }
  }

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    return this.dateTimeService.getRentalPeriod(rentDate, returnDate);
  }

  calculateRentalPeriod() {
    this.rentalPeriod = this.getRentalPeriod(this.convertStringToDate(this.rentalDate), this.convertStringToDate(this.returnDate))
  }

  checkIfAnyReservationsBetweenSelectedDates(houseId: number, rentalDate: string, returnDate: string) {
    if (!houseId || !rentalDate || !returnDate) {
      return
    }
    this.validateReservationDates(rentalDate, returnDate);
    if (this.validateRentalDates === true) {
      this.rentalDetailService.checkIfCanHouseBeRentedBetweenSelectedDates(houseId, rentalDate, returnDate).subscribe(response => {
        this.rentalConfirmation = response;
      }, error => {
        this.rentalConfirmation = error.error;
      })
    }
  }

  goToPayment(){
    console.log("ödeme sistemine git")
  }

}
