import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ToastService } from '../toast.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private toaster: ToastService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => (user && this.auth.canEdit(user) ? true : false)),
      tap(canEdit => {
        if (!canEdit) {
          this.toaster.openSnackBar('Access denied. Must have permission to view content');
          this.router.navigate(['home/projects']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
  
}
