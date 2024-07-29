import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('email') == null || localStorage.getItem('pass') == null) {
      alert("Please enter credentials to access")
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
