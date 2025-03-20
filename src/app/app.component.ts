import { Component, inject, OnInit } from '@angular/core';
import { HousingService } from './housing.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { increment, decrement } from './store/counter.actions';
import { clearUser, setUser } from './store/user.actions';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Para el formulario de login
import { User } from './store/user.reducer'; // Si tienes un User interface

@Component({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  housingService = inject(HousingService);
  isLoading = true;
  counter$: Observable<number>;
  loginForm: FormGroup;
  isAuthenticated$: Observable<boolean>; // Observable que indica si el usuario está logueado
  user$: Observable<User | null>;

  constructor(private store: Store<{ counter: { count: number }, user: User | null }>, private fb: FormBuilder) {
    this.counter$ = store.select(state => state.counter?.count);
    this.user$ = store.select(state => state.user);
    this.isAuthenticated$ = store.select(state => state.user !== null || state.user !== undefined);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.isAuthenticated$.subscribe(isAuthenticated => {
      this.user$.subscribe(user => {
        if (isAuthenticated) {
          console.log('Usuario autenticado:', user);  // Log del usuario autenticado
        } else {
          console.log('Usuario no autenticado');
        }
      });
    });
  }

  loginUser(user: User) {
    this.store.dispatch(setUser({ user }));
  }

  logoutUser() {
    this.store.dispatch(clearUser());
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user: User = {
        id: Date.now(),  // Simula un ID único
        name: 'Asier Arguinchona', // Aquí puedes personalizar el nombre
        email: this.loginForm.value.email,
      };
      this.loginUser(user); // Dispatch la acción para guardar el usuario en el store
    }
  }

  async ngOnInit() {
    // Verificar el estado de `user` al inicio
    this.store.select('user').subscribe(userState => {
      console.log('User state on init:', userState);
    });
    await this.housingService.getHouses();
    this.isLoading = false;
  }
}
