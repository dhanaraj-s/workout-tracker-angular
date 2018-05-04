import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Workout } from '../model/workout.model';
import { StartWorkoutService } from './startworkout.service';

@Component({
  selector: 'app-startworkout',
  templateUrl: './startworkout.component.html',
  styleUrls: ['./startworkout.component.css']
})
export class StartworkoutComponent implements OnInit {

  form: FormGroup;
  startWorkout: boolean = true;
  startDateVal: Date = new Date();
  workout: Workout = new Workout();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private startWorkoutService: StartWorkoutService,
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      workoutTitle: [null, Validators.required],
      comment: [null, Validators.required],
      startDate: [null, Validators.required],
      startTime: [null, Validators.required],
      endDate: [null, Validators.required],
      endTime: [null, Validators.required],
    });

    var mode = this.route.snapshot.paramMap.get('mode'); 
    if ("start" === mode) {
      this.startWorkout = true;
    } else {
      this.startWorkout = false;
    }
    var workoutObjStr = this.route.snapshot.paramMap.get('workout');
    if(workoutObjStr) {
      var workoutObject = JSON.parse(workoutObjStr);
      this.workout = workoutObject;
      this.startWorkout = true;
      this.form.controls['workoutTitle'].setValue(workoutObject.workoutTitle);
      this.form.controls['startDate'].setValue(this.currentDate());
      this.form.controls['startTime'].setValue(this.currentTime());
    }
  }

  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }

  currentTime() {
    const currentDate = new Date();
    return currentDate.toTimeString().substring(0, 5);
  }

  onStart() {
    this.startWorkout = false;
    this.form.controls['endDate'].setValue(this.currentDate());
    this.form.controls['endTime'].setValue(this.currentTime());
  }

  onEnd() {
    this.workout.startDate = this.form.value.startDate;
    this.workout.startTime = this.form.value.startTime;
    this.workout.endDate = this.form.value.endDate;
    this.workout.endTime = this.form.value.endTime;
    this.workout.comment = this.form.value.comment;
    console.log(JSON.stringify(this.workout));
    this.startWorkoutService.saveActiveWorkout(this.workout).subscribe(
      result => {
        console.log(result);
        this.navigateAway(result);
      },
      error => console.log(<any>error)
    ); 
  }

  navigateAway(data) {
    if(data) {
      this.router.navigate(['/', 'workout']);
    }
  }

}
