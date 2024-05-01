import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl:'./products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit{
  constructor(private productService : ProductService,private router:Router,
              public appstate : AppStateService) {
  }
  ngOnInit(): void {
  this.searchProducts();
   }//des le demarage et la genertion de composant on l'affecte à cet URL de backend

  public searchProducts(){
      this.productService.searchProducts(this.appstate.productstate.keyword,this.appstate.productstate.currentPage,this.appstate.productstate.pagesize)
        .subscribe(
          {
            next: (res) => {
              let products = res.body as Product[];//cast to product array

              let totalProducts: number = parseInt(res.headers.get("x-total-count")!);

              //   this.appstate.productstate.totalProducts = totalProducts;
              let totalPages = Math.ceil(totalProducts / this.appstate.productstate.pagesize);
              if (totalProducts % this.appstate.productstate.pagesize != 0){
                totalPages++;
            }
              this.appstate.setProductState({totalPages:totalPages,products:products,totalProducts:totalProducts});
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
 //this.appstate.productstate.products = this.appstate.productstate.products.filter(
   //(p:any)=> p.id != product.id)
       this.searchProducts(); //je fais un refresh
       }
     } //ici je mets à jour le front end
     )
  }


  handlePages(page:number) {
    this.appstate.productstate.currentPage = page;
    this.searchProducts();
  } //ici je vais changer la page

  editProduct(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`).then(r => console.log("ok"));
  }
}
