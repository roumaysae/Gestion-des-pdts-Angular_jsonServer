import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})//it's already provided in the whole root//dés de demarage il est instancié
export class ProductService {

  constructor(private httpClient : HttpClient) {}

  //1st method
  public getProducts():Observable<Array<Product>>{
    return this.httpClient.get<Array<Product>>("http://localhost:8080/products");
  }

  //2nd method
  public checkProduct(product:Product):Observable<any>{
    return this.httpClient.patch<Product>(`http://localhost:8080/products/${product.id}`,
      {checked: !product.checked});  }
}
