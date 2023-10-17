import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAuthGuard } from 'src/Gards/user-auth.guard';

const routes: Routes = [
  {path:"",redirectTo:"/Account/Login",pathMatch:'full'},
  {path:"Register",title:"Register",component:RegisterComponent,canActivate:[UserAuthGuard]},
  {path:"Login",title:"Login",component:LoginComponent,canActivate:[UserAuthGuard]},
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
  ,exports:[RouterModule]
})
export class AccountModule { }
