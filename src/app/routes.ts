import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {DetailsComponent} from './components/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { CreateHouseComponent } from './create-house/create-house.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'create-house',
    component: CreateHouseComponent,
    title: 'Create house',
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
export default routeConfig;