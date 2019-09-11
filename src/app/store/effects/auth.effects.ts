import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { User } from 'src/app/models/user';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {
  AuthActionTypes
} from './../actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.login),
      switchMap(payload => {
        return this.authService.logIn(payload.email, payload.password).pipe(
          map(
            (user: User) =>
              AuthActionTypes.loginSuccess({ token: user.token, email: payload.email })
          ),
          catchError(error => of(AuthActionTypes.loginFailure({ error })))
        );
      })
    )
  );


  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.loginSuccess),
        tap(user => {
          localStorage.setItem('token', user.token);
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () => this.actions$.pipe(ofType(AuthActionTypes.loginFailure)),
    { dispatch: false }
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.signUp),
      switchMap(payload =>
        this.authService.signUp(payload).pipe(
          map(
            (user: User) =>
              AuthActionTypes.signUpSuccess({ token: user.token, email: payload.email })
          ),
          catchError(error => of(AuthActionTypes.signUpFailure({ error })))
        )
      )
    )
  );

  signUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.signUpSuccess),
        tap(user => {
          localStorage.setItem('token', user.token);
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  signUpFailure$ = createEffect(
    () => this.actions$.pipe(ofType(AuthActionTypes.signUpFailure)),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.logout),
        tap(user => localStorage.removeItem('token'))
      ),
    { dispatch: false }
  );
}
