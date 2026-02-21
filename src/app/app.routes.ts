import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Profile } from './pages/profile/profile';
import { Browse } from './pages/browse/browse';
import { Events } from './pages/events/events';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile },
  { path: 'browse', component: Browse },
  { path: 'events', component: Events },
  { path: '**', redirectTo: '' }
];
