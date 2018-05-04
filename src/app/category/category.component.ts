import { Component, OnInit } from '@angular/core';
import { CreateWorkoutService } from '../create-workout/create-workout.service';
import { CategoryService } from './category.service';
import { Category } from '../model/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[];
  categoryObj: Category;
  private errorMessage: String;
  newCategory: string;

  constructor(
    private workoutService: CreateWorkoutService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.workoutService.getCategory()  
    .subscribe(
        categories => {
          this.categories = categories;
          console.log(this.categories);
        },
        error => this.errorMessage = error
    );
  }

  deleteCategory(categoryId: string) {
    this.categoryService.deleteCategory(categoryId).subscribe(
      categories => {
        this.categories = categories;
        console.log(this.categories);
      },
      error => this.errorMessage = error
    );
  }

  editCategory(category: Category) {
    this.categories.forEach(obj => {
      if (obj.categoryId === category.categoryId) {
        obj.isEdit = true;
      }
     });
  }

  updateCategory(category: Category) {
    this.categoryService.updateCategory(category)  
    .subscribe(
        categories => {
          this.categories = categories;
          console.log(this.categories);
        },
        error => this.errorMessage = error
    );
  }

  addCategory() {
    if (this.newCategory) {
      this.categoryObj = new Category();
      this.categoryObj.categoryName = this.newCategory;
      this.categoryService.addCategory(this.categoryObj)  
      .subscribe(
          categories => {
            this.categories = categories;
            console.log(this.categories);
            this.newCategory = '';
          },
          error => this.errorMessage = error
      );
    }
  }

}
