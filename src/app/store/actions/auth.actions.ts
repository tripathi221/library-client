import {createAction, props } from '@ngrx/store';
import { User, Credentials } from 'src/app/models';

export const login = createAction(
  '[Auth] Login',
  props<Credentials>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string, email: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const signUp = createAction(
  '[Auth] Signup',
  props<User>()
);

export const signUpSuccess = createAction(
  '[Auth] Signup Success',
  props<{ token: string, email: string }>()
);

export const signUpFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');

// export enum AuthActionTypes {
//   LOGIN = '[Auth] Login',
//   LOGIN_SUCCESS = '[Auth] Login Success',
//   LOGIN_FAILURE = '[Auth] Login Failure',
//   SIGNUP = '[Auth] Signup',
//   SIGNUP_SUCCESS = '[Auth] Signup Success',
//   SIGNUP_FAILURE = '[Auth] Signup Failure',
//   LOGOUT = '[Auth] Logout',
// }

// export class LogIn implements Action {
//   readonly type = AuthActionTypes.LOGIN;
//   constructor(public payload: any) { }
// }

// export class LogInSuccess implements Action {
//   readonly type = AuthActionTypes.LOGIN_SUCCESS;
//   constructor(public payload: any) { }
// }

// export class LogInFailure implements Action {
//   readonly type = AuthActionTypes.LOGIN_FAILURE;
//   constructor(public payload: any) { }
// }

// export class SignUp implements Action {
//   readonly type = AuthActionTypes.SIGNUP;
//   constructor(public payload: any) { }
// }

// export class SignUpSuccess implements Action {
//   readonly type = AuthActionTypes.SIGNUP_SUCCESS;
//   constructor(public payload: any) { }
// }

// export class SignUpFailure implements Action {
//   readonly type = AuthActionTypes.SIGNUP_FAILURE;
//   constructor(public payload: any) { }
// }

// export class LogOut implements Action {
//   readonly type = AuthActionTypes.LOGOUT;
// }

// export type All =
//   | LogIn
//   | LogInSuccess
//   | LogInFailure
//   | SignUp
//   | SignUpSuccess
//   | SignUpFailure
//   | LogOut;