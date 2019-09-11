import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './validators';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/store/app.state';
import { AuthActionTypes } from 'src/app/store/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupFrom: FormGroup;
  loading = false;
  submitted = false;
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.signupFrom = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.loading = state.pending;
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupFrom.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupFrom.invalid) {
      return;
    }

    this.loading = true;
    this.store.dispatch(AuthActionTypes.signUp(this.signupFrom.value));
  }

}
