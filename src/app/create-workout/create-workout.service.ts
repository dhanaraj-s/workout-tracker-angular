import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Workout } from '../model/workout.model';
import { Category } from '../model/category.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CreateWorkoutService {

  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
      this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8', 
                                   'Accept': 'application/json, */*' });
      this.options = new RequestOptions({ headers: this.headers });
  }

  getCategory (): Observable<any> {
    return this.http.get('http://localhost:8090/workouttracker/viewallcategory', this.options)
                    .map(this.extractData)
                    .do(data => console.log("get Countries from json: " + JSON.stringify(data)))
                    .catch(this.handleError);
  }

  saveWorkout (param: any): Observable<Workout[]> {
    let body = JSON.stringify(param); // Stringify payload
    return this.http.post('http://localhost:8090/workouttracker/createworkout', body, this.options) // ...using post request
                    .catch((error:any) => Observable.throw(error || 'Server error')); //...errors if any
  }

  updateWorkout (param: any): Observable<Workout[]> {
    let body = JSON.stringify(param); // Stringify payload
    return this.http.post('http://localhost:8090/workouttracker/updateworkout', body, this.options) // ...using post request
                    .catch((error:any) => Observable.throw(error || 'Server error')); //...errors if any
  }

  private extractData(response: Response) {
    let body = response.json();
    return body || {};
  }

  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || "500 internal server error");
  }

}