import { Component } from '@angular/core';
import {appendFile} from "node:fs";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(protected appstate : AppStateService) {}

  totalChekedProduct() {
    let totalProducts = this.appstate.productstate.products.filter((product:any) => product.checked==true);
    return totalProducts.length ;
  }
}
