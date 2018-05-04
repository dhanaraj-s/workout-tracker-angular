import { Pipe, PipeTransform } from '@angular/core';
import { Workout } from './model/workout.model';

@Pipe({
  name: 'workoutfilter'
})
export class WorkoutFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
      return items.filter(it => {
        return it.workoutTitle.toLowerCase().includes(searchText);
      });
  }
}