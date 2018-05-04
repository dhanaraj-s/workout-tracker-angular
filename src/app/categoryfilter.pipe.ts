import { Pipe, PipeTransform } from '@angular/core';
import { Category } from './model/category.model';

@Pipe({
  name: 'categoryfilter'
})
export class CategoryFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
      return items.filter(it => {
        return it.categoryName.toLowerCase().includes(searchText);
      });
  }
}