import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginData } from '../Models/loginData.models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loggedin: boolean = false;
  baseApiUrl: string = 'https://localhost:7075';
  constructor(private http: HttpClient) {}
  onLogin(data: LoginData): Observable<Response> {
    this.loggedin = true;
    return this.http.post<Response>(this.baseApiUrl + '/Login', data, {
      withCredentials: true,
    });
  }
  onLogout(): Observable<Response> {
    this.loggedin = true;
    return this.http.post<Response>(this.baseApiUrl + '/logout', {
      withCredentials: true,
    });
  }
  getUserName(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + '/Login/UserName', {
      withCredentials: true,
    });
  }
  checkIfLogged(): Observable<boolean> {
    return this.http.get<boolean>(
      this.baseApiUrl + '/Login/CheckIfAuthenticated',
      {
        withCredentials: true,
      }
    );
  }
}
