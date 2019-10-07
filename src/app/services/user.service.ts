import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUsers } from '../models/users';
import { Observable, Subject, BehaviorSubject, from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient, private router: Router) { }

  apiUrl: string = 'http://localhost:3000/crud-users'

  /*Declare loginStatus global veriable to track the login status*/
  loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /*This function is to update the loginStatus global veriable after changed login status*/
  updateLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }

  /*This function is to check user login info from localStorage and redirect the page*/
  checkUserLoginStatusAndRedirect() {
    let userData = localStorage.getItem("user");
    if (userData != null && userData != undefined) {
      this.updateLoginStatus(true);
      this.router.navigate(['/dashboard']);
    } else {
      this.updateLoginStatus(false);
      this.router.navigate(['/']);
    }
  }

  /*This function is to check user login*/
  userLogin(email: string): Observable<IUsers[]> {
    return this._http.get<IUsers[]>(this.apiUrl + '?email=' + email);
  }

  getUsersList(): Observable<IUsers[]> {
    return this._http.get<IUsers[]>(this.apiUrl);
  }

  getUserDetails(id): Observable<IUsers> {
    return this._http.get<IUsers>(this.apiUrl + '/' + id);
  }

  addUserRecord(data): Observable<IUsers> {
    return this._http.post<IUsers>(this.apiUrl, data);
  }

  updateUserRecord(id, data): Observable<IUsers> {
    return this._http.patch<IUsers>(this.apiUrl + '/' + id, data);
  }

  deleteUserRecord(id): Observable<IUsers> {
    return this._http.delete<IUsers>(this.apiUrl + '/' + id);
  }

  allUsersGlobal: Subject<IUsers[]> = new Subject<IUsers[]>();
  getAllUsersGlobal() {
    this.getUsersList().subscribe(data => {
      this.allUsersGlobal.next(data);
    })
  }

}
