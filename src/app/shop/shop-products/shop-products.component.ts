import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ProductDB } from 'src/app/product.model';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.scss'],
})
export class ShopProductsComponent implements OnInit {
  
  @Input() loadedProducts: ProductDB[] = [];
  @Input() idsInFavoriteList: string[] = [];
  myPageName: string = 'shop';

  constructor() {}

  ngOnInit(): void {}
}
