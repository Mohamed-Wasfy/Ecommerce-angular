import { Component, OnInit } from '@angular/core';
import { CartTotal } from './product-list/cartTotal.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cartTotal: CartTotal = new CartTotal(0, 0);
  
  constructor() {}
  
  ngOnInit(): void {}

  putTheValue(newItem: CartTotal) {
    this.cartTotal.items = newItem.items;
    this.cartTotal.total = newItem.total;
  }
}