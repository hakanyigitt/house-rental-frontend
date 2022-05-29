export interface HouseRental{
    houseId:number;
    userId:number;
    dayToStay:number;
    totalPrice:number;
    rentalDate:Date;
    endDate:Date | null;
}