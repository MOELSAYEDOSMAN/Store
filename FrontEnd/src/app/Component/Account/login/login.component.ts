import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountOutput } from 'src/Model/Account/account-output';
import { InputLogin } from 'src/Model/Account/input-login';
import { AccountSettingService } from 'src/Service/Account/account-setting.service';
import { TokenAndRoleService } from 'src/Service/TokenAndRole/token-and-role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy{
  loginForm:FormGroup;
  loggindBol:boolean=false;
  Result:AccountOutput ={error:false} as AccountOutput
  private DesObser:Subscription[]=[]
constructor(private apiAccount:AccountSettingService,private fb:FormBuilder
  ,private TokenSetting:TokenAndRoleService,private router:Router,
  private UserState:TokenAndRoleService) {
  this.loginForm=fb.group(
    {
      Email:new FormControl('',[Validators.required]),
      Password:['',[Validators.required,Validators.minLength(8),Validators.pattern( "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$" )]]
    });

}
//validation
  get Email()
  {
    return this.loginForm.get("Email")
  }
  get Password()
  {
    return this.loginForm.get("Password")
  }
  submit()
  {
    if(this.loginForm.valid)
    {
      this.loggindBol=true;
      let input:InputLogin=this.loginForm.value;
      console.log(input);

      this.DesObser.push(
        this.apiAccount.Login(input).subscribe({
          next:r=>{
            console.log(r);
            this.Result.error=r.error;
            this.Result.message=r.message;
            this.loggindBol=false;
            if(r.error==false)
          {
            localStorage.setItem("token",r.token);
            localStorage.setItem("User",JSON.stringify(r));
            this.TokenSetting.SetUserRole(r.roles);
            this.TokenSetting.setStateUser(true);
            this.router.navigate(["/Home"])
          }

          },
          error:e=>{
            this.Result.message="try time Late";
            this.Result.error=true;
            this.loggindBol=false;
          }
        })
      )
    }
    else{
      this.Result.error=true
      this.Result.message="Data Not Valid"

    }
  }
  ngOnDestroy(): void {
    this.DesObser.forEach(o=>o.unsubscribe());
  }
}
