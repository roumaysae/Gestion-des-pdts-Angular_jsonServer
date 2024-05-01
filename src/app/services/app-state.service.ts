import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
    public productstate:any={

      products : [],// that means ! toi know it's not intialized just keep it
      keyword : "",
      totalPages: 0,
      pagesize: 3,
      currentPage: 1,
      totalProducts: 0,
    }
  constructor() { }

  //creer une methode pour initialiser les produits setproductstate:
  public setProductState(state:any){
    this.productstate = {...this.productstate,...state};//creation 'une copie de state et je vais changer ce que je veux qu niveau de la copie
}
}
