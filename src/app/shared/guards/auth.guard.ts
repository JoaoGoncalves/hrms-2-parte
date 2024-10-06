import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { isAuth } from '../functions/is-auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const isAuth$ = isAuth();
  const router = inject(Router);

  return isAuth$.pipe(
    map(isAuth => isAuth || router.createUrlTree(['/login']))
  );
};
