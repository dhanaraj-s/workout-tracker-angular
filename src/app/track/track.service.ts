import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Workout } from '../model/workout.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TrackService {

  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
      this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8', 
                                   'Accept': 'application/json, */*' });
      this.options = new RequestOptions({ headers: this.headers });
  }

  getActiveWorkouts (): Observable<any> {
    return this.http.get('http://localhost:8090/workouttracker/getactiveworkouts', this.options)
                    .map(this.extractData)
                    .do(data => console.log("get workouts from json: " + JSON.stringify(data)))
                    .catch(this.handleError);
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