import { Component, OnInit } from '@angular/core';
import { CreateWorkoutService } from './create-workout.service';
import { Workout } from '../model/workout.model';
import { Category } from '../model/category.model';
import { Observable } from 'rxjs/Rx';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.component.html',
  styleUrls: ['./create-workout.component.css']
})
export class CreateWorkoutComponent implements OnInit {

  categories: Category[];
  count: number = 0;
  disabledVal: string = "disabled";
  workout: Workout = new Workout();
  private errorMessage: string;
  form: FormGroup;
  editWorkout: boolean = false;
  workoutId: number;

  // Constructor with injected service
  constructor(
    private workoutService: CreateWorkoutService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      workoutTitle: [null, Validators.required],
      note: [null, Validators.required],
      calories: [null, Validators.required],
      category: [null, Validators.required],
    });
    this.form.controls['category'].setValue(
      this.workoutService.getCategory()  
      .subscribe(
          categories => this.categories = categories,
          error => this.errorMessage = error
      ), {onlySelf: true});
    this.form.controls['calories'].setValue(this.count);
    /**
     * Edit flow
     */
    var workoutObjStr = this.route.snapshot.paramMap.get('workout');
    if(workoutObjStr) {
      var workoutObject = JSON.parse(workoutObjStr);
      this.editWorkout = true;
      this.form.controls['workoutTitle'].setValue(workoutObject.workoutTitle);
      this.form.controls['note'].setValue(workoutObject.workoutNote);
      this.form.controls['calories'].setValue(workoutObject.caloriesBurnPerMin);
      this.form.controls['category'].setValue(workoutObject.categoryId);
      this.workoutId = workoutObject.workoutId;
    }
  }
  
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.workout.workoutTitle = this.form.value.workoutTitle;
      this.workout.workoutNote = this.form.value.note;
      this.workout.caloriesBurnPerMin = this.form.value.calories;
      this.workout.categoryId = this.form.value.category;
      this.workoutService.saveWorkout(this.workout).subscribe(
        result => {
          console.log(result);
          this.navigateAway(result);
        },
        error => console.log(<any>error)
      ); 
    } 
  }

  navigateAway(data) {
    if(data) {
      this.router.navigate(['/', 'workout']);
    }
  }

  addCategory() {
    this.router.navigate(['/', 'category']);
  }

  increment() {
    this.count+=0.1;
    this.count=Math.round(this.count*10)/10;
    this.disabledVal = "";
    this.form.controls['calories'].setValue(this.count);
  }

  decrement() {
    if (this.count === 0) {
      this.disabledVal = "disabled";
    } else {
      this.count-=0.1;
      this.count=Math.round(this.count*10)/10;
      this.form.controls['calories'].setValue(this.count);
      if (this.count <= 0) {
        this.disabledVal = "disabled";
      }
    }
  }

  onCancel() {
    this.router.navigate(['/', 'workout']);
  }

  onUpdate() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.workout.workoutId = this.workoutId;
      this.workout.workoutTitle = this.form.value.workoutTitle;
      this.workout.workoutNote = this.form.value.note;
      this.workout.caloriesBurnPerMin = this.form.value.calories;
      this.workout.categoryId = this.form.value.category;
      this.workoutService.updateWorkout(this.workout).subscribe(
        result => {
          console.log(result);
          this.navigateAway(result);
        },
        error => console.log(<any>error)
      ); 
    }
  }

}
