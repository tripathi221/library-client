import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
  canActivate(): boolean {
    if (!this.authService.getToken()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
