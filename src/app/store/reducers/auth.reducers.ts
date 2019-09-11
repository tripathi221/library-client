import { User } from '../../models';
import { AuthActionTypes } from '../actions';
import { createReducer, on } from '@ngrx/store';


export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | {};
  // error message
  errorMessage: string | null;
  pending: boolean | false;
}

export const initialState: State = {
  isAuthenticated: false,
  user: {},
  errorMessage: null,
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(AuthActionTypes.login, state => ({
    ...state,
    errorMessage: null,
    pending: true,
  })),

  on(AuthActionTypes.loginSuccess, (state, { token, email }) => ({
    ...state,
    isAuthenticated: true,
    user: {
      token,
      email
    },
    errorMessage: null,
    pending: false,
  })),

  on(AuthActionTypes.loginFailure, (state, { error }) => ({
    ...state,
    errorMessage: error,
    pending: false,
  })),

  on(AuthActionTypes.signUp, state => ({
    ...state,
    error: null,
    pending: true,
  })),

  on(AuthActionTypes.signUpSuccess, (state, { token, email }) => ({
    ...state,
    isAuthenticated: true,
    user: {
      token,
      email
    },
    errorMessage: null,
    pending: false,
  })),

  on(AuthActionTypes.signUpFailure, (state, { error }) => ({
    ...state,
    errorMessage: error,
    pending: false,
  })),

  on(AuthActionTypes.logout, () => initialState)
);

// export const reducer1 = (state = initialState, action): State => {
//   switch (action.type) {
//     case AuthActionTypes.loginSuccess: {debugger;
//                                         return {
//         ...state,
//         isAuthenticated: true,
//         user: {
//           token: action.payload.token,
//           email: action.payload.email
//         },
//         errorMessage: null
//       };
//     }
//     case AuthActionTypes.loginFailure: {
//       return {
//         ...state,
//         errorMessage: 'Incorrect email and/or password.'
//       };
//     }
//     case AuthActionTypes.signUpSuccess: {
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: {
//           token: action.payload.token,
//           email: action.payload.email
//         },
//         errorMessage: null
//       };
//     }
//     case AuthActionTypes.signUpFailure: {
//       return {
//         ...state,
//         errorMessage: 'That email is already in use.'
//       };
//     }
//     case AuthActionTypes.logout: {
//       return initialState;
//     }
//     default: {
//       return state;
//     }
//   }
// };
