import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setUser } from 'src/app/store/user.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/store/user.reducer';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div>
          <label for="email">Email:</label>
          <input id="email" formControlName="email" type="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" formControlName="password" type="password" required />
        </div>
        <button type="submit" [disabled]="loginForm.invalid">Login</button>
      </form>
    </div>
  `,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user: User = {
        id: Date.now(),  // Simula un ID único
        name: 'John Doe', // Aquí podrías usar el nombre del usuario
        email: this.loginForm.value.email,
      };

      // Dispatch la acción para guardar el usuario en el store
      this.store.dispatch(setUser({ user }));
    }
  }
}
