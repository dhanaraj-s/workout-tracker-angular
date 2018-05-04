import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Workout } from '../model/workout.model';
import { Category } from '../model/category.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CategoryService {

  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
      this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8', 
                                   'Accept': 'application/json, */*' });
      this.options = new RequestOptions({ headers: this.headers });
  }

  deleteCategory (param: string): Observable<any> {
    return this.http.delete('http://localhost:8090/workouttracker/deletecategory'+'/'+param, this.options)
                    .map(this.extractData)
                    .do(data => console.log("get categories from json: " + JSON.stringify(data)))
                    .catch(this.handleError);
  }

  updateCategory (param: any): Observable<Category[]> {
    let body = JSON.stringify(param); // Stringify payload
    return this.http.post('http://localhost:8090/workouttracker/editcategory', body, this.options)
                    .map(this.extractData)
                    .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  addCategory (param: any): Observable<Category[]> {
    let body = JSON.stringify(param); // Stringify payload
    return this.http.post('http://localhost:8090/workouttracker/addcategory', body, this.options)
                    .map(this.extractData)
                    .catch((error:any) => Observable.throw(error || 'Server error'));
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