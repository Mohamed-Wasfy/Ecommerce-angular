import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  error: string = '';
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  submit(registerForm: FormGroup) {
    this._AuthService.regestier(registerForm.value).subscribe(
      (response: any) => {
        localStorage.setItem('userInfo', JSON.stringify(response));
        console.log(response);
        this._Router.navigate(['/login']);
      },
      (error) => {
        this.error = error.error
      }
    );
  }
  goToLogIn() {
    this._Router.navigate(['/login']);
  }

  registerForm = new FormGroup({
    name: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(25),
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_ ]*$'),
    ]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.minLength(11),
    ]),
    address: new FormControl(null),
  });

  ngOnInit(): void {}
}
