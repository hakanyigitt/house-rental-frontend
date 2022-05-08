import { Pipe, PipeTransform } from '@angular/core';
import { HouseDetail } from '../models/houseDetails';

@Pipe({
  name: 'houseFilter'
})
export class HouseFilterPipe implements PipeTransform {

  transform(value: HouseDetail[], houseFilterText: string): HouseDetail[] {
    houseFilterText= houseFilterText? houseFilterText.toLocaleLowerCase():""
    return houseFilterText?value.filter((h:HouseDetail)=>h.houseName.toLocaleLowerCase().indexOf(houseFilterText)!==-1):value
  }

}
