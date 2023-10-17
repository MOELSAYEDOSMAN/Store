import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './Component/Home/main-layout/main-layout.component';
import { IndexPageComponent } from './Component/Home/index-page/index-page.component';
import { ErrorPageComponent } from './Component/Home/error-page/error-page.component';

const routes: Routes = [
  {path:"" ,component:MainLayoutComponent,children:[
    {path:"",redirectTo:"Home",pathMatch:'full'},
    {path:"Home",title:"Home",component:IndexPageComponent},
    //Admin
    {
      path: 'Admin',
      loadChildren: () => import('src/app/Component/Admin/admin.module').then(m => m.AdminModule)
    },

    //Product
    {
      path: 'Product',
      loadChildren: () => import('src/app/Component/Product/product/product.module').then(m => m.ProductModule)
    },
  ]},
  //acount
  {
    path: 'Account',
    loadChildren: () => import('src/app/Component/Account/account.module').then(m => m.AccountModule)
   },


   //errorPage
   {path:"**",title:"ErrorPage",component:ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
