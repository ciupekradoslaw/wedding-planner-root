import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      loadRemoteModule('auth', './LoginComponent').then(
        (m) => m.LoginComponent,
      ),
  },
];
