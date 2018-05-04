import { Component, OnInit } from '@angular/core';
import { TrackService } from './track.service';
import { Workout } from '../model/workout.model';
import { Track } from '../model/track.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  workouts: Workout[];
  tracks: Track;
  errorMessage: string;
  weeklyTitle: string;
  monthlyTitle: string;
  yearlyTitle: string;
  WeeklyLabels: Array<string> = [];
  MonthlyLabels: Array<string> = [];
  YearlyLabels: Array<string> = [];
  data1: Array<number> = [];
  data2: Array<number> = [];
  data3: Array<number> = [];
  weekTotalCalories: Number = 0;
  monthTotalCalories: Number = 0;
  yearTotalCalories: Number = 0;
  weekTotalCaloriesMin: any = 0;
  monthTotalCaloriesMin: any = 0;
  dayTotalCaloriesMin: any = 0;

  constructor(
    private trackService: TrackService,
    private router: Router,
  ) { }

  chartOptions = {
    responsive: true
  }

  colors = [
    { 
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
  ]

  ngOnInit() {
    this.trackService.getActiveWorkouts()
      .subscribe(
      workouts => {
        this.workouts = workouts;
        this.populateChartData(this.workouts);
        this.WeeklyLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.MonthlyLabels = ['Week1', 'Week2', 'Week3', 'Week4', 'Week5'];
        this.YearlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      },
      error => this.errorMessage = error
      );
  }

  populateChartData(workouts: Workout[]) {
    if (workouts) {
      this.weeklyTitle = 'Week wise calorie burn chart';
      this.monthlyTitle = 'Month wise calorie burn chart';
      this.yearlyTitle = 'Year wise calorie burn chart';
      var curr = new Date();
      var day = curr.getDay();
      var firstday = new Date(curr.getTime() - 60*60*24* day*1000); // will return firstday (i.e. Sunday) of the week
      var lastday = new Date(curr.getTime() + 60 * 60 *24 * 6 * 1000);
      var firstMonthDay = new Date(curr.getFullYear(), curr.getMonth(), 1);
      var lastMonthDay = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
      var year = new Date().getFullYear();
      let weeklyMap = new Map();
      let monthlyMap = new Map();
      let yearlyMap = new Map();
      this.workouts.forEach(obj => {
        var startDate = new Date(obj.startDate +' '+obj.startTime);
        var endDate = new Date(obj.endDate +' '+obj.endTime);
        var diff = endDate.getTime() - startDate.getTime();
        var date = new Date(obj.endDate);
        if (date >= firstday && date <= lastday) {
          if (weeklyMap.get(date.getDay())) {
            var temp = weeklyMap.get(date.getDay());
            temp = temp + obj.caloriesBurnPerMin * (diff/60000) ;
            weeklyMap.set(date.getDay(), temp);
          } else {
            weeklyMap.set(date.getDay(), (obj.caloriesBurnPerMin * (diff/60000)));
          }
          this.weekTotalCaloriesMin = this.weekTotalCaloriesMin + (diff/60000);
          if (date.toISOString().substring(0,10) === new Date().toISOString().substring(0,10)) {
            this.dayTotalCaloriesMin = this.dayTotalCaloriesMin + (diff/60000);
          }
        }
        if (date >= firstMonthDay && date <= lastMonthDay) {
          if (monthlyMap.get(this.getWeekOfMonth(date))) {
            var temp = monthlyMap.get(this.getWeekOfMonth(date));
            temp = temp + obj.caloriesBurnPerMin * (diff/60000) ;
            monthlyMap.set(this.getWeekOfMonth(date), temp);
          } else {
            monthlyMap.set(this.getWeekOfMonth(date), (obj.caloriesBurnPerMin * (diff/60000)));
          }
          this.monthTotalCaloriesMin = this.monthTotalCaloriesMin + (diff/60000);
        }
        if (year === date.getFullYear()) {
          if (yearlyMap.get(date.getMonth())) {
            var temp = yearlyMap.get(date.getMonth());
            temp = temp + obj.caloriesBurnPerMin * (diff/60000) ;
            yearlyMap.set(date.getMonth(), temp);
          } else {
            yearlyMap.set(date.getMonth(), (obj.caloriesBurnPerMin * (diff/60000)));
          }
        }
      });
      for(var i = 0; i < 7; i++){
        if (weeklyMap.get(i)) {
          this.data1.push(weeklyMap.get(i));
          this.weekTotalCalories += weeklyMap.get(i);
        } else {
          this.data1.push(0);
        }
      }

      for(var i = 0; i < 5; i++){
        if (monthlyMap.get(i)) {
          this.data2.push(monthlyMap.get(i));
          this.monthTotalCalories += monthlyMap.get(i);
        } else {
          this.data2.push(0);
        }
      }

      for(var i = 0; i < 12; i++){
        if (yearlyMap.get(i)) {
          this.data3.push(yearlyMap.get(i));
          this.yearTotalCalories += yearlyMap.get(i);
        } else {
          this.data3.push(0);
        }
      }
    }
  }

  getWeekOfMonth(date: Date) {
    let adjustedDate = date.getDate()+date.getDay();
    let prefixes = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(prefixes[0 | adjustedDate / 7])+1);
   }

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData1 = [
    {
      label: 'Calories burned',
      data: this.data1
    }
  ];
  chartData2 = [
    {
      label: 'Calories burned',
      data: this.data2
    }
  ];
  chartData3 = [
    {
      label: 'Calories burned',
      data: this.data3
    }
  ];

  // CHART CLICK EVENT.
  onChartClick(event) {
    // just trying refresh full variable
    this.chartData1 = this.chartData1.slice();
    this.chartData2 = this.chartData2.slice();
    this.chartData3 = this.chartData3.slice();
  }

}
