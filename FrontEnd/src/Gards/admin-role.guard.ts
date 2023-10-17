import { AccountOutput } from './../Model/Account/account-output';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {
  constructor(private router:Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {




      if (localStorage.getItem("User")) {
        let user:AccountOutput=JSON.parse(localStorage.getItem("User")??"");
        let CkAdminUSer=user.roles.find(x=>x=="Admin")?true:false;
        if(CkAdminUSer==true)
        {
          return true;
        }
        else
        {
          this.router.navigate(["/ErrorAuth"]);
          return false;
        }
      }
      else {
        this.router.navigate(["/Login"]);
        return false
      }

    }
  }


