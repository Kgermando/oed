import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  constructor(private router:Router,private securityService:SecurityService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Observable(observer=>{
        this.securityService.isManager().subscribe(res=>{
          if(res){
            observer.next(res);
          }
          else{
            observer.next(false);
            this.router.navigate(['/auth/login']);
          }
        })
      })
  }
  
}
