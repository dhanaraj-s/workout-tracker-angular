import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WorkoutComponent } from './workout/workout.component';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { CategoryComponent } from './category/category.component';
import { TrackComponent } from './track/track.component';
import { HomeComponent } from './home/home.component';
import { CreateWorkoutService } from './create-workout/create-workout.service';
import { WorkoutService } from './workout/workout.service';
import { CategoryService } from './category/category.service';
import { CategoryFilterPipe } from './categoryfilter.pipe';
import { WorkoutFilterPipe } from './workoutfilter.pipe';
import { StartworkoutComponent } from './startworkout/startworkout.component';
import { StartWorkoutService } from './startworkout/startworkout.service';
import { TrackService } from './track/track.service';
import { ChartsModule } from 'ng2-charts';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'workout', component: WorkoutComponent },
  { path: 'create-workout', component: CreateWorkoutComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'track', component: TrackComponent },
  { path: 'workout-tracker', component: StartworkoutComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    WorkoutComponent,
    CreateWorkoutComponent,
    CategoryComponent,
    TrackComponent,
    HomeComponent,
    CategoryFilterPipe,
    WorkoutFilterPipe,
    StartworkoutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [
    CreateWorkoutService,
    WorkoutService,
    CategoryService,
    StartWorkoutService,
    TrackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
