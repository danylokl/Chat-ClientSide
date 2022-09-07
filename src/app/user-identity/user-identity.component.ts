import { Component, OnInit } from '@angular/core';

import { LoginData } from '../Models/loginData.models';
import { Location } from '@angular/common';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-identity',
  templateUrl: './user-identity.component.html',
  styleUrls: ['./user-identity.component.css'],
})
export class UserIdentityComponent implements OnInit {
  DataLogin: LoginData = { userName: '', password: '' };
  some: any;
  constructor(
    private loginservice: LoginService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onSubmit(username: string, password: string) {
    this.DataLogin.password = password;
    this.DataLogin.userName = username;
    this.loginservice
      .onLogin(this.DataLogin)
      .subscribe((user) => console.log(user));
    this.router.navigate(['chat']);
    // window.location.href = '/chat';
  }
  goBack(): void {
    this.location.back();
  }
}
