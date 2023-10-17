import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountSettingService } from 'src/Service/Account/account-setting.service';
import { TokenAndRoleService } from 'src/Service/TokenAndRole/token-and-role.service';
import { AccountModule } from '../../Account/account.module';
import { AccountOutput } from 'src/Model/Account/account-output';
import { CartService } from 'src/Service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
ShowDropList:boolean=false;
UserStateBool:boolean=false;
private lsDestoryObservable:Subscription[]=[];
CkAdminUSer:boolean=false;
productOrder:number=0
constructor(private UserState:TokenAndRoleService,private apiAccount:AccountSettingService,
  private router:Router,private cartSetting:CartService) {
this.lsDestoryObservable.push(
  UserState.IsUserLogSubject().subscribe(r=>{
    this.UserStateBool=r;
  }),
  cartSetting.GetNumber().subscribe(
    r=>{
      this.productOrder=r;
    }
  ),
  UserState.RolesUSer().subscribe(r=>{
    this.CkAdminUSer=r.find(x=>x=="Admin")?true:false;
  })
)}
  ngOnDestroy(): void {
    this.lsDestoryObservable.forEach(x=>x.unsubscribe());
  }

logout()
{
  localStorage.removeItem("token")
  localStorage.removeItem("User")
  this.UserState.setStateUser(false)
  this.UserState.DeleteUserRole()
this.lsDestoryObservable.push(
this.apiAccount.Logout().subscribe(
  {
    next:r=>{
      localStorage.removeItem("token")
      localStorage.removeItem("User")
      this.UserState.setStateUser(false)
      this.router.navigate(["/Home"])
    },
    error:e=>{
      alert("Error");
    }
  }
)
)
}
DropeLsitToggole()
{
  this.ShowDropList=!this.ShowDropList;
}
}
