import { Pipe, PipeTransform } from '@angular/core';
import { City } from '../models/city';

@Pipe({
  name: 'cityFilter'
})
export class CityFilterPipe implements PipeTransform {

  transform(value: City[], cityFilterText: string): City[] {
    cityFilterText = cityFilterText?cityFilterText.toLocaleLowerCase():""
    return cityFilterText?value.filter((c:City)=>c.cityName.toLocaleLowerCase().indexOf(cityFilterText)!==-1):value
  }

}
