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

  products : Array<Product>=[]; // that means ! toi know it's not intialized just keep it
  public  keyword : string="";
   totalPages: number=0;
   pagesize: number=3;
   currentPage: number=1;
  constructor(private productService : ProductService) {

  }

  ngOnInit(): void {
  this.searchProducts();
   }//des le demarage et la genertion de composant on l'affecte à cet URL de backend

  public searchProducts(){
      this.productService.searchProducts(this.keyword,this.currentPage,this.pagesize)
        .subscribe(
          {
            next: (res) =>{
              this.products = res.body as Product[];//cast to product array
            let totalProducts:number = parseInt(res.headers.get("x-total-count")!);
            this.totalPages = Math.ceil(totalProducts/this.pagesize);
            if(totalProducts % this.pagesize !=0)
              this.totalPages++;
            },
          error: err => {
            console.log(err);
            }   }
        )
   // this.products =this.productService.searchProducts();
  }

  handleCheckProduct(product : Product) {
    this.productService.searchProducts()
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
//this.searchProducts();
 this.products = this.products.filter(p=>p.
    id != product.id)
       }
     } //ici je mets à jour le front end
     )
  }


  handlePages(page:number) {
    this.currentPage=page;
    this.searchProducts();
  } //ici je vais changer la page
}
