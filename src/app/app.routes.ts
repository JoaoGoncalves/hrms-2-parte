import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { EmployeeService } from './services/employee.service';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'registration',
    loadComponent: () =>
      import('./pages/registration.component').then(
        (m) => m.RegistrationComponent
      ),
  },
  {
    path: 'employees',
    providers: [EmployeeService],
    canActivate: [authGuard],
    loadChildren: () => import('./pages/employees/employees.routes').then( m => m.routes),
  },
  {
    path: 'work',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/work/work.routes').then( m => m.routes),
  },
  {
    path: 'recruitment',
    canActivate: [authGuard],
    loadChildren: () => {
      return import('./pages/recruitment/recruitment.routes').then((m) => m.routes);
    },
  },
];
