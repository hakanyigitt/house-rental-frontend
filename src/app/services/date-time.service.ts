import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }


  formatDate(date: Date): string {
    return date.toLocaleDateString().split(".").reverse().join("-");
  }

  getDateNow(): string {
    let date = new Date();
    let returnStr = this.formatDate(date);
    return returnStr;
  }

  addDayToDate(date: Date, addedDay: number): string {
    let newDate = date;
    newDate.setDate(date.getDate() + addedDay);
    let returnString = this.formatDate(newDate);
    return returnString;
  }

  convertStringToDate(dateString: string): Date {
    return new Date(dateString);
  }

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    let hours = Math.abs(returnDate.getTime() - rentDate.getTime());
    let days = Math.ceil(hours / (1000 * 3600 * 24));
    return days;
  }
}