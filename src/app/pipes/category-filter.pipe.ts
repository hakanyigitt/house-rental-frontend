import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/category';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(value: Category[], categoryFilterText: string): Category[] {
    categoryFilterText = categoryFilterText?categoryFilterText.toLocaleLowerCase():""
    return categoryFilterText?value.filter((c:Category)=>c.categoryName.toLocaleLowerCase().indexOf(categoryFilterText)!==-1):value
  }

}
