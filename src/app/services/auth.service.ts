import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = 'http://localhost:5500/api/v1/users';

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = 'https://us-central1-social-awesome-63dd9.cloudfunctions.net/api/login';
    // `${this.BASE_URL}/user`;
    return this.http.post<User>(url, {email, password});
  }

  signUp(payload): Observable<User> {
    const url = 'https://us-central1-social-awesome-63dd9.cloudfunctions.net/api/signup';
    // `${this.BASE_URL}`;
    return this.http.post<User>(url, payload);
  }
}
