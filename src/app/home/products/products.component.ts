import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [
    new Product(
      'assets/img/product/product-1.jpg',
      'Piqué Biker Jacket',
      343,
      'new', //badge (new,sale, '')
      'new-arrivals' //category (hot-sales, new-arrivals,' ')
    ),
    new Product(
      'assets/img/product/product-2.jpg',
      'Piqué Biker Jacket',
      43.48,
      '',
      ''
    ),
    new Product(
      'assets/img/product/product-3.jpg',
      'Multi-pocket Chest Bag',
      43.48,
      '',
      '',
    ),
    new Product(
      'assets/img/product/product-4.jpg',
      'Multi-pocket Chest Bag',
      43.48,
      'sale',
      'hot-sales',
    ),
    new Product(
      'assets/img/product/product-5.jpg',
      'Multi-pocket Chest Bag',
      43.48,
      'new',
      'new-arrivals'
    ),
    new Product(
      'assets/img/product/product-6.jpg',
      'Multi-pocket Chest Bag',
      43.48,
      '',
      '',
    ),
    new Product(
      'assets/img/product/product-7.jpg',
      'Multi-pocket Chest Bag',
      43.48,
      'new',
      'new-arrivals'
    ),
    new Product(
      'assets/img/product/product-8.jpg',
      'Multi-pocket Chest Bag',
      43.48,
      '',
      '',
    ),
  ];
  constructor() {}

  ngOnInit(): void {}
}
