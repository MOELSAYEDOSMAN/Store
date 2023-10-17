import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InputProduct } from 'src/Model/Product/input-product';
import { OutputProduct } from 'src/Model/Product/output-product';
import { ProductModel } from 'src/Model/Product/product-model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductSettingService {

  constructor(private httpclient:HttpClient) {
  }
  GetAllProduct(index:number)
  {
    return this.httpclient.get<OutputProduct>(`${environment.api}/Product/GetAllProduct?index=${index}`)
  }
  GetNewProduct(index:number)
  {
    return this.httpclient.get<OutputProduct>(`${environment.api}/Product/GetNewProduct?index=${index}`)
  }
  GetWithType(type:string,index:number)
  {
    return this.httpclient.get<OutputProduct>(`${environment.api}/Product/GetWithType?type=${type}&index=${index}`)
  }
  GetProduct(Id:string)
  {
    return this.httpclient.get<ProductModel>(`${environment.api}/Product/GetProduct?Id=${Id}`)
  }
  SerchProduct(serch:string)
  {
    return this.httpclient.get<ProductModel[]>(`${environment.api}/Product/SerchProduct?serch=${serch}`)

  }
  GetProductEdit(Id:string)
  {
    return this.httpclient.get<ProductModel[]>(`${environment.api}/Product/GetProductEdit?Id=${Id}`,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+localStorage.getItem("token")??"",
      })
    });
    }
  DelteProduct(Id:string)
  {
    return this.httpclient.get<InputProduct>(`${environment.api}/Product/DelteProduct?Id=${Id}`,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+localStorage.getItem("token")??"",
      })
    });
    }
  RemoveImg(src:string)
  {
    return this.httpclient.get<InputProduct>(`${environment.api}/Product/RemoveImg?src=${src}`,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+localStorage.getItem("token")??"",
      })
    });
    }
  ChangeImg(input:FormData,src:string)
  {
    return this.httpclient.put<InputProduct>(`${environment.api}/Product/ChangeImg?src=${src}`,input,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+localStorage.getItem("token")??"",
      })
    });
    }

    UploadImage(input:FormData,id:string)
  {
    return this.httpclient.post<InputProduct>(`${environment.api}/Product/UploadImage?Id=${id}`,input,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+localStorage.getItem("token")??"",
      })
    });
    }
  AddProduct(icon:File,ImgProduct:File[],input:InputProduct)
  {
    let Input=new FormData();
    Input.append("Icon",icon);
    for(let f of ImgProduct)
    {
      Input.append("Imgs",f);
    }
    Input.append("input",JSON.stringify(input));
    return this.httpclient.post<InputProduct>(`${environment.api}/Product/AddProduct`,Input,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+localStorage.getItem("token")??"",
      })
    });
    }
  EditInformationProduct(input:InputProduct,id:string)
  {
    return this.httpclient.put<InputProduct>(`${environment.api}/Product/EditInformationProduct?id=${id}`,input,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+localStorage.getItem("token")??"",
      })
    });
    }

    sumbit()
    {

    }
}
