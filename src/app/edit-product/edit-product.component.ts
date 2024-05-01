import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  productId!: number;
  productFormGroup!: FormGroup;
  successMessage: string = '';

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private fb: FormBuilder) {
  }

  //initialisation de formulaire, maintenant il faut l'afficher au niveau de la vue HTML UI
  ngOnInit() {
    //on envoie la requete vers le backend pour recuperer le produit
    this.productId = this.route.snapshot.params['id'];
//on recupere le produit par son id
    this.productService.getProductById(this.productId).subscribe(
      {
//la reponse arrive
        next: (product) => {
          //on initialise le formulaire
          this.productFormGroup = this.fb.group(
            {
              id: this.fb.control(product.id),
              name: this.fb.control(product.name,Validators.required),
              price: this.fb.control(product.price,Validators.min(100)),
              checked: this.fb.control(product.checked),
            })
        },
        //en attendant la reponse le formulaire est vide , donc on ne peut pas l'afficher, si la reponse arrive on peut l'afficher
        error: (error) => {
          console.log(error);
        }
      })
  }

  updateProduct() {
    let product: Product = this.productFormGroup.value; //on recupere les valeurs du formulaire(qu'on a deja remplir de product)

    this.productService.updateProduct(product).subscribe(
      {
        next: (product:Product) => {
          this.successMessage = "Product updated successfully"; // Définissez le message de succès
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }
}
