import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private http: HttpClient
  ) {}

  canActivate(): boolean | UrlTree {
    var isAdmin: boolean = false;
    if (localStorage.getItem('isAdmin') === 'true') {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
    console.log(isAdmin);
    return isAdmin;
  }
}
