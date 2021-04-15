import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

import { AuthGuard } from './shared/guards/auth.guard'
import { MaquetaComponent } from './components/test/maqueta/maqueta.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'inicio', component: HomeComponent },
  { path: 'maqueta', component: MaquetaComponent },
  //{ path: 'login', component: LoginComponent },
  //{ path: 'logout/:sure', component: LoginComponent },
  { path: '**', component: ErrorComponent },

  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'inicio', component: HomeComponent, canActivate: [AuthGuard]  },
  // { path: 'maqueta', component: MaquetaComponent, canActivate: [AuthGuard]  },
  // { path: 'login', component: LoginComponent },
  // { path: 'logout/:sure', component: LoginComponent },
  // { path: '**', component: ErrorComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
