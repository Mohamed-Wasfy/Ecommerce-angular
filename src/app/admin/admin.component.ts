import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ProductDB } from '../product.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  products: ProductDB[] = [];
  myPageName: string = 'admin';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getFavoriteProduct();
  }

  getFavoriteProduct() {
    this.http
      .get<ProductDB[]>('https://eshop-iti.herokuapp.com/api/v1/products')
      .subscribe((products) => {
        this.products = products;
      });
  }
}
