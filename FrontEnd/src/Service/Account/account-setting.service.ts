import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountOutput } from 'src/Model/Account/account-output';
import { InputLogin } from 'src/Model/Account/input-login';
import { InputRegister } from 'src/Model/Account/input-register';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingService {

  private httpOptions = {
    headers: new HttpHeaders({
   'Content-Type':  'application/json',
  })
  };
  constructor(private httpclient:HttpClient) {
  }

  Login(input:InputLogin)
  {

  return this.httpclient.post<AccountOutput>(`${environment.api}/Account/Login`,input,this.httpOptions)
  }

  Register(input:InputRegister)
  {
  return this.httpclient.post<AccountOutput>(`${environment.api}/Account/Register`,input,this.httpOptions)
  }

  Logout()
  {
  return this.httpclient.get<boolean>(`${environment.api}/Account/LogOut`,{
    headers:new HttpHeaders({
      "Authorization":"Bearer "+localStorage.getItem("token")??"",
    })
  });
  }

  }
