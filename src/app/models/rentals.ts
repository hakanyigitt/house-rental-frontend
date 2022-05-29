export interface Rental{
    id:number;
    houseId:number;
    userId:number;
    rentDate:Date;
    returnDate:Date | null;
}