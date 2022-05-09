import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDB } from '../product.model';

@Component({
  selector: 'app-shop-deatils',
  templateUrl: './shop-deatils.component.html',
  styleUrls: ['./shop-deatils.component.scss'],
})
export class ShopDeatilsComponent implements OnInit {
  productId: string;
  currentProduct: ProductDB;
  quantity: number = 1;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['productId'];
    if (this.productId) {
      this.fetchProductDetails(this.productId);
    }
  }

  increaseQuantity() {
    this.quantity += 1;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  private fetchProductDetails(productId: string) {
    this.http
      .get<ProductDB>(
        `https://eshop-iti.herokuapp.com/api/v1/products/${productId}`
      )
      .subscribe((productDetails) => {
        this.currentProduct = productDetails;
      });
  }

  addToCart() {
    let myColor: string =
      document.querySelector('input[type=radio][name=color]:checked')?.id || '';
    let mySize: string =
      document.querySelector('input[type=radio][name=size]:checked')?.id || '';
    this.http
      .post<any>('https://eshop-iti.herokuapp.com/api/v1/cart', {
        product: this.currentProduct._id,
        quantity: this.quantity,
        color: myColor,
        size: mySize,
      })
      .subscribe((response) => {
        console.log('add to current successfully');
        console.log(response);
      });
  }
}
