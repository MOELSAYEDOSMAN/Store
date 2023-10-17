import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/Model/category/category';
import { InputCategory } from 'src/Model/category/input-category';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private httpOptions = {
    headers: new HttpHeaders({
   'Content-Type':  'application/json',
  })
  };
  constructor(private httpclient:HttpClient) {
  }


  GetAll()
  {
   return this.httpclient.get<Category[]>(`${environment.api}/Category/GetAll`)
  }

  GetCategory(index:number)
  {
    return this.httpclient.get<Category>(`${environment.api}/Category/GetCategory?id=${index}`);
  }

  DeleteCategory(index:number)
  {
    return this.httpclient.get<InputCategory>(`${environment.api}/Category/DeleteCategory?id=${index}`,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+localStorage.getItem("token")??"",
      })
    });
    }

  EditCategory(index:number,input:InputCategory)
  {
    return this.httpclient.put<InputCategory>(`${environment.api}/Category/EditCategory?id=${index}`,input,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+localStorage.getItem("token")??"",
      })
    });
    }

  AddCategory(input:InputCategory)
  {
    return this.httpclient.post<InputCategory>(`${environment.api}/Category/AddCategory`,input,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+localStorage.getItem("token")??"",
      })
    });
    }

}
