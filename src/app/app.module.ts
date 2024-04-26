import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new-product/new-product.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    NewProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule //pour start sending requests from client to server and get res
    // and we'll inject it in the component of products
  ],
  providers: [
    provideClientHydration()
  ],//here where we call service
  bootstrap: [AppComponent]
})
export class AppModule { }
