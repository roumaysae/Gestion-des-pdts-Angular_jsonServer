import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
    public productForm!:FormGroup;

    constructor(private  fb: FormBuilder, private productService: ProductService) {
    }

    ngOnInit() { //stocker tous les donnes saisies dans le formulaire avec le formBuilder dans productForm
           this.productForm= this.fb.group({
            name: this.fb.control('',[Validators.required]),
            price: this.fb.control(0,[Validators.required]),
            checked: this.fb.control(false)
           })
    }

  saveProduct() {

    let product:Product = this.productForm.value;//toute les donnees de prdt se trouve dans le formBuilder et j'appelle le service productservice
    this.productService.addProduct(product).subscribe({
      next: data => {
      alert(JSON.stringify(data))
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
