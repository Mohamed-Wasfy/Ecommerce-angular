import { Component, Input, OnInit } from '@angular/core';
import { CartTotal } from '../product-list/cartTotal.model';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.scss'],
})
export class CartTotalComponent implements OnInit {
  @Input() cartTotal: CartTotal = new CartTotal(0, 0);

  constructor() {}

  ngOnInit(): void {}

  moveDataToCheckout(){
    
  }

  
}
