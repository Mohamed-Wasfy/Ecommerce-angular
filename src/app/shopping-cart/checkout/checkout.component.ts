import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  productsInCheckout: { name: string; totalPrice: number }[] = [];
  productTotal: { totalPrice: number };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCheckoutProducts();
  }

  getCheckoutProducts() {
    this.http
      .get<any>('https://eshop-iti.herokuapp.com/api/v1/cart')
      .pipe(
        map((responseData) => {
          const productsInCheckout: any[] = [];
          for (const ele of responseData) {
            productsInCheckout.push({
              name: ele.product._id,
              totalPrice: ele.product.price * ele.quantity,
            });
          }
          return productsInCheckout;
        })
      )
      .subscribe((products) => {
        this.productsInCheckout = products;
        if (this.productsInCheckout.length > 0) {
          this.productTotal = {
            totalPrice: this.productsInCheckout
              .map((e) => e.totalPrice)
              .reduce((prev, next) => prev + next),
          };
        }
        console.log(this.productsInCheckout);
        console.log(this.productTotal);
      });
  }
}
