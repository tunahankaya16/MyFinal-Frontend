import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  products:Product []=[];
  dataLoaded = false;
  filterText= "";

 constructor(private productService:ProductService,
   private activatedRoot:ActivatedRoute,
   private toastrService:ToastrService,
   private cartService:CartService) {
  

 }
 ngOnInit(): void {
  this.activatedRoot.params.subscribe(params=>{
    if (params["categoryId"]) {
      this.getProductsByCategory(params["categoryId"]);
    }
    else{
      this.getProducts();
    }
  })
 
 } 

 getProducts(){
  this.productService.getProducts().subscribe(response=>{
    this.products = response.data;
    this.dataLoaded = true;
  });
 }

 getProductsByCategory(categoryId:number){
  this.productService.getProductsByCategory(categoryId).subscribe(response=>{
    this.products = response.data;
    this.dataLoaded = true;
  });
  }
addToCart(product:Product){
  this.toastrService.success("sepete eklendi",product.productName)
  this.cartService.addToCart(product);
}
 }

