import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountOutput } from 'src/Model/Account/account-output';
import { InputRegister } from 'src/Model/Account/input-register';
import { AccountSettingService } from 'src/Service/Account/account-setting.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  loggindBol:boolean=false;
  Result:AccountOutput={isLogin:false,error:false} as AccountOutput;
  private DesObser:Subscription[]=[];
  RegisterFrm:FormGroup;
constructor(private fb:FormBuilder,private ApiAccount:AccountSettingService,
  private router:Router) {
  this.RegisterFrm=fb.group({
      userName:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$")]],
      re_Password:['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$")]],
      phone:['',[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern("^\\+?01[0125][0-9]{8}$")]]
  },{validators:this.RePasswordCk()}
  )}

   //Validator
   get Email()
   {
     return this.RegisterFrm.get('email');
   }

   get Password()
   {
     return this.RegisterFrm.get('password');
   }
   get re_Password()
   {
     return this.RegisterFrm?.errors?.['PasswordNotMatch'];
   }
   get Phone()
   {
     return this.RegisterFrm.get('phone');
   }
   get UserName()
   {
    return this.RegisterFrm.get('userName');
   }


  RePasswordCk():ValidatorFn
{
return  (controle:AbstractControl): ValidationErrors | null =>
{
let val1=controle.get('password')?.value;
let val2=controle.get('re_Password')?.value;
let error={"PasswordNotMatch":{"value":"Password not match"}}
return (val1!=val2)?error:null;
}
}

//validation

submit(){
  if(this.RegisterFrm.valid){
    this.loggindBol=true
    let ConverValue:InputRegister=this.RegisterFrm.value
    let input:InputRegister={
      email:ConverValue.email,
      password:ConverValue.password,
      phone:ConverValue.phone,
      userName:ConverValue.userName
    }
    this.DesObser.push(
      this.ApiAccount.Register(input).subscribe({
        next:r=>{
          this.Result.message=r.message;
          this.Result.error=r.error;
          if(r.error==false)
          {
            alert("login")
            this.router.navigate(["/Account"]);
          }
          this.loggindBol=false
        },
        error:e=>{
          this.Result.error=true;
          this.Result.message="Error: Try time Late"
          this.loggindBol=false
        }
      })
    )
  }
  else
  {
    this.Result.error=true;
    this.Result.message="Cheack Input"
  }
}

ngOnDestroy(): void {
  this.DesObser.forEach(o=>o.unsubscribe());
}
}
