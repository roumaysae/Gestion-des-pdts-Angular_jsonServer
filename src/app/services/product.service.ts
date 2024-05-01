import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})//it's already provided in the whole root//dés de demarage il est instancié
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  //1st method
  public searchProducts(keyword: string="",page:number=1 ,size:number=4 ){
    return this.httpClient.get(`http://localhost:8080/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:"response"});
  }

  //2nd method
  public checkProduct(product: Product): Observable<any> {
    return this.httpClient.patch<Product>(`http://localhost:8080/products/${product.id}`,
      {checked: !product.checked});
  }

  public deleteProduct(product: Product) {
    return this.httpClient.delete<any>(`http://localhost:8080/products/${product.id}`);
  }

//on va pas retounrer un prdt donc c'est void

 public addProduct(product: Product): Observable<Product> {
     return this.httpClient.post<Product>(`http://localhost:8080/products`,product);
}

  getProductById(productId: number): Observable<Product>{
   return  this.httpClient.get<Product>(`http://localhost:8080/products/${productId}`);
  }

  updateProduct(product: Product): Observable<Product>{
    return this.httpClient.put<Product>(`http://localhost:8080/products/${product.id}`,product);
  }
}
