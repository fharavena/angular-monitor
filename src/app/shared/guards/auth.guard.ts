import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _userservice: UserService, private _router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (!localStorage.getItem('token')) {
      this._router.navigate(['/login']);
      return false;
    }

    this._userservice.getToken().subscribe(
      (response) => {
        if (response['status'] == 'error') {
          this._router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      },
      (error) => {
        return false;
      }
    );

    return true;
  }
}
