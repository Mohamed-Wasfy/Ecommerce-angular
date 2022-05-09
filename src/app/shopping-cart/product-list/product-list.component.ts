import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map } from 'rxjs';
import { CartTotal } from './cartTotal.model';
import { ProductCart } from './productCart.model';

@Component({
  selector: '.app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: ProductCart[] = [];

  cartTotal: CartTotal;

  @Output() newItemEvent = new EventEmitter<CartTotal>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  ngDoCheck() {
    // console.log(this.cartTotal);
    if (this.products.length > 0 && this.cartTotal !== undefined) {
      this.cartTotal.items = this.products
        .map((e) => e.quantity)
        .reduce((prev, next) => prev + next);
      this.cartTotal.total = Number(
        this.products
          .map((e) => e.totalPrice)
          .reduce((prev, next) => prev + next)
          .toFixed(2)
      );
      this.newItemEvent.emit(this.cartTotal);
    }
  }

  getCartProducts() {
    this.http
      .get<any>('https://eshop-iti.herokuapp.com/api/v1/cart')
      .pipe(
        map((responseData) => {
          const productsArray: ProductCart[] = [];
          for (const ele of responseData) {
            productsArray.push(
              new ProductCart(
                ele.product._id,
                ele.product.image,
                ele.product.name,
                ele.product.price,
                ele.quantity,
                ele.size,
                ele.color
              )
            );
          }
          return productsArray;
        })
      )
      .subscribe((products) => {
        this.products = products;
        console.log('-----product in Cart from Db start');
        console.log(this.products);
        console.log('-----product in Cart from Db end');
        if (this.products.length > 0) {
          this.cartTotal = new CartTotal(
            this.products
              .map((e) => e.quantity)
              .reduce((prev, next) => prev + next),
            Number(
              this.products
                .map((e) => e.totalPrice)
                .reduce((prev, next) => prev + next)
                .toFixed(2)
            )
          );
        }
      });
  }
  
}
