import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})


export class ProductsComponent implements OnInit{

  products : Array<Product>=[]; // that means ! to i know it's not intialized just keep it

  constructor(private productService : ProductService) {

  }

  ngOnInit(): void {
  this.getProducts();
   }//des le demarage et la genertion de composant on l'affecte à cet URL de backend

  public getProducts(){
      this.productService.getProducts()
        .subscribe(
          {
          next : data =>
            this.products=data,
          error: err => {
            console.log(err);
            }   }
        )
   // this.products =this.productService.getProducts();
  }

  handleCheckProduct(product : Product) {
    this.productService.getProducts()
      .subscribe( {
      next : updatedProduct =>
      {
        product.checked=!product.checked;
      }

    })

  }

  deleteHandle(product: Product) {
    if(confirm("are you sure ?, You want to delete this data !!!"))
   this.productService.deleteProduct(product) //je fais delete de backend
     .subscribe(
     {
       next: value  =>{
//this.getProducts();
 this.products = this.products.filter(p=>p.
    id != product.id)
       }
     } //ici je mets à jour le front end
     )
  }
}
