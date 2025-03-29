import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategories'
})
export class FilterCategoriesPipe implements PipeTransform {

  transform(categories: any[], filtro: string): any[] {
    if (!categories || !filtro) {
      return categories;
    }
    
    return categories.filter(category =>
      category.name.toLowerCase().includes(filtro.toLowerCase())
    );
  }

}
