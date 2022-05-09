import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable,BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = new BehaviorSubject(null);

  saveCurrentUser()
  {
    let token:any = localStorage.getItem('userToken');
    this.currentUser.next(jwtDecode(token));
    console.log(this.currentUser);
  }
  constructor(private _HttpClient:HttpClient,private _Router:Router)
  {
    if(localStorage.getItem('userToken')!=null)
    {
      this.saveCurrentUser();
    }
  }
  
  regestier(formData:any):Observable<any>
  {
   return this._HttpClient.post('https://eshop-iti.herokuapp.com/api/v1/users/register',formData)

  }
  login(formData:any):Observable<any>
  {
    
   return this._HttpClient.post('https://eshop-iti.herokuapp.com/api/v1/users/login',formData)

  }
  logout()
  {
    this.currentUser.next(null);
    localStorage.clear()
    this._Router.navigate(['']);

  }
  userDeatils()
  {
    this._Router.navigate(['/userdeatils']);
  }
}
