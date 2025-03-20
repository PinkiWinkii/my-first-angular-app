import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component'; // Tu componente standalone
import { provideStore } from '@ngrx/store'; // Usar provideStore en lugar de StoreModule
import routeConfig from './app/routes'; // Tu configuración de rutas
import { counterReducer } from './app/store/counter.reducer'; // El reducer de tu store
import { userReducer } from './app/store/user.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig), // Configuración de rutas
    provideStore({ counter: counterReducer, user: userReducer }) // Proporcionar el store
  ]
}).catch((err) => console.error(err));
