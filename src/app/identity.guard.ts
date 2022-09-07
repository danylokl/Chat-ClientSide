import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterState,
  RouterStateSnapshot,
  CanActivateChild,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './Services/login.service';
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private loginservice: LoginService, private router: Router) {}
  logged!: boolean;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.loginservice.checkIfLogged().subscribe()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (!this.loginservice.checkIfLogged().subscribe()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
