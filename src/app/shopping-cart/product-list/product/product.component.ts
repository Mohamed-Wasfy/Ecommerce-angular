import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductCart } from '../productCart.model';

@Component({
  selector: '[app-product]',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() currentProduct: ProductCart = new ProductCart(
    '',
    '',
    '',
    0,
    0,
    '',
    ''
  );
  @Input() productsCard: ProductCart[] = [];
  cartTotal = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  increaseQuantity() {
    this.currentProduct.quantity += 1;
    this.currentProduct.totalPrice = Number(
      (this.currentProduct.quantity * this.currentProduct.price).toFixed(2)
    );
    this.changeQuantityOfProductInCart();
  }

  decreaseQuantity() {
    if (this.currentProduct.quantity > 1) {
      this.currentProduct.quantity -= 1;
      this.currentProduct.totalPrice = Number(
        (this.currentProduct.quantity * this.currentProduct.price).toFixed(2)
      );
      this.changeQuantityOfProductInCart();
    }
  }

  removeFromCart() {
    this.reqRemoveFromCart();
    var index: number = this.productsCard.indexOf(this.currentProduct);
    this.productsCard.splice(index, 1);
  }

  changeQuantityOfProductInCart() {
    this.http
      .post<any>('https://eshop-iti.herokuapp.com/api/v1/cart', {
        product: this.currentProduct.id,
        quantity: this.currentProduct.quantity,
        color: this.currentProduct.color,
        size: this.currentProduct.size,
      })
      .subscribe((response) => {
        // console.log(response)
      });
  }

  reqRemoveFromCart() {
    console.log('try to delete item from cart');
    console.log(this.currentProduct.id);
    console.log(this.currentProduct.color);
    console.log(this.currentProduct.size);
    this.http
      .request(
        'delete',
        `https://eshop-iti.herokuapp.com/api/v1/cart/product/${this.currentProduct.id}`,
        {
          body: {
            color: this.currentProduct.color,
            size: this.currentProduct.size,
          },
        }
      )
      .subscribe({
        next: (_) => {},
        error: (_) => {},
      });
  }
}
