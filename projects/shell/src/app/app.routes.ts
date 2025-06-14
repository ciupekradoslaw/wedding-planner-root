import {Routes} from '@angular/router';
import {loadRemoteModule} from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => loadRemoteModule('auth', './Component').then(m => m.AppComponent),
  },
];
