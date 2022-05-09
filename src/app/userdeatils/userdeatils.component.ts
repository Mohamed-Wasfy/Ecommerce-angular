
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-userdeatils',
  templateUrl: './userdeatils.component.html',
  styleUrls: ['./userdeatils.component.scss']
})
export class UserdeatilsComponent implements OnInit {
  userData : any;

  constructor(private _AuthService: AuthService, private http: HttpClient) {
   
    _AuthService.currentUser.subscribe(() => {
      if (_AuthService.currentUser.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }

  isLogin: boolean = false;

  private getUserInfo(){
    this.http
      .get<any[]>(`https://eshop-iti.herokuapp.com/api/v1/users/get/me`)
      .subscribe((response:any) => {
        // console.log(response);
        this.userData = response
        // console.log(this.userData.name)
      });
  }
  

  ngOnInit(): void {
    this.getUserInfo();
  }

}
