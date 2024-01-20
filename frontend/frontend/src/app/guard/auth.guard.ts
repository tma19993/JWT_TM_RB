import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private apiService: ApiService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.apiService.isLoggedIn(); // Implementuj tę metodę w AuthService
    if (isLoggedIn) {
        return true;
    } else {
        this.router.navigate(['/login-page']); // Przekieruj do logowania, jeśli użytkownik nie jest zalogowany
        return false;
    }
  }

  
}
