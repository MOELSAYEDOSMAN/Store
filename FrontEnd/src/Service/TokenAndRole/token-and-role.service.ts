import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountOutput } from 'src/Model/Account/account-output';

@Injectable({
  providedIn: 'root'
})
export class TokenAndRoleService {

  private ISLoginUser: BehaviorSubject<boolean>;
  private RolesUser: BehaviorSubject<string[]>;
  constructor() {
        this.ISLoginUser=new BehaviorSubject<boolean>(localStorage.getItem("token")?true:false);
        if(localStorage.getItem("User")){
          let Us:AccountOutput=JSON.parse(localStorage.getItem("User")??"")
          this.RolesUser=new BehaviorSubject<string[]>(Us.roles);
        }
        else
        {
          this.RolesUser=new BehaviorSubject<string[]>([]);
        }
  }


  setStateUser(state:boolean)
  {
    this.ISLoginUser.next(state);
  }
  IsUserLogSubject():Observable<boolean>
  {
    return this.ISLoginUser.asObservable();
  }


  SetUserRole(roles:string[])
  {
    this.RolesUser.next(roles)
  }
  DeleteUserRole()
  {
    this.RolesUser.next([]);
  }
    RolesUSer():Observable<string[]>
    {
      return this.RolesUser.asObservable();
    }



}
