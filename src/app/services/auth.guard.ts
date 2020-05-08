import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const roles = this.authService.decode();
    console.log(roles);

    if(roles == next.data.roles[0] || roles == next.data.roles[1]){
      console.log('true');
      return true;
    }
    console.log('false');
    this.router.navigate(['/noaccess']);
    return false;


  }
}
