import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { UserInformation } from '../core/login/User';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDto } from '../core/login/UserDto';

const GET_HEADERS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  responseType: 'text' as 'json'
};


@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl: string = environment.baseUrl + "/InventoryManagementSystem/users/"

  constructor(private http: HttpClient) { }

  registerUser(user: UserInformation){
    return this.http.post(this.baseUrl + 'register',user,{responseType: 'text'})
      .pipe(catchError(this.handleError));
  }

  loginUser(userdto: UserDto){
    console.log('here');
    //console.log(this.http.post(this.baseUrl + 'login',userdto,GET_HEADERS));

    return this.http.post(this.baseUrl + 'login',userdto,GET_HEADERS)
      .pipe(catchError(this.handleError));
  }

  private handleError (errorResponse: HttpErrorResponse) {
    if(errorResponse.error instanceof ErrorEvent){
      //console.error("Client Side Error", errorResponse.error.message);
    } else {
      console.error("Server Side Error",errorResponse);
    }
    return throwError('There is a problem with service');
  }

}
