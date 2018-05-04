import { Component, OnInit } from '@angular/core';
import { WorkoutService } from './workout.service';
import { Workout } from '../model/workout.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  workouts: Workout[];
  private errorMessage: string;

  constructor(
    private workoutService: WorkoutService,
    private router: Router
  ) { }

  ngOnInit() { 
      this.workoutService.getWorkouts()  
      .subscribe(
          workouts => {
            this.workouts = workouts;
            console.log(this.workouts);
          },
          error => this.errorMessage = error
      );
  }

  editWorkout(workout: Workout) {
    if(workout) {
      this.router.navigate(['/create-workout', { workout: JSON.stringify(workout)}]);
    }
  }

  deleteWorkout(workoutId: string) {
    this.workoutService.deleteWorkout(workoutId).subscribe(
      workouts => {
        this.workouts = workouts;
        console.log(this.workouts);
      },
      error => this.errorMessage = error
    );
  }

  startWorkout(workout: Workout) {
    if(workout) {
      this.router.navigate(['/workout-tracker', { "mode" : "start", workout: JSON.stringify(workout)}]);
    }
  }

  endWorkout(workout: Workout) {
    if(workout) {
      this.router.navigate(['/workout-tracker', { "mode" : "end", workout: JSON.stringify(workout)}]);
    }
  }

}
