import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';

@Injectable(/* {
  providedIn: 'root'
} */)
export class AuthGuard implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {

    return this.authService.isAuth$.pipe(
      map(isAuth => isAuth || this.router.createUrlTree(['/login']))
    );
  }

}
