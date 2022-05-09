import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../home/products/product.model';
import { ProductDB } from '../product.model';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() currentProduct: ProductDB;
  @Input() pageName: string;
  @Input() ProductsInFavoriteList: ProductDB[]; // in favorite page only
  @Input() idsInFavoriteList: string[]; // in shop page only
  isInFavorite: boolean = false;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.checkIfInFavoriteList();
  }

  ngOnChanges(): void {
    this.checkIfInFavoriteList();
  }
  // work only in favorite page
  removeFromFavorite() {
    if (this.ProductsInFavoriteList) {
      let index: number = this.ProductsInFavoriteList?.indexOf(
        this.currentProduct
      );
      this.ProductsInFavoriteList.splice(index, 1);
    }
    this.ReqRemoveFromFavorite();
  }
  // work only in shop page
  checkIfInFavoriteList() {
    if (this.idsInFavoriteList) {
      let index: number = this.idsInFavoriteList.indexOf(
        this.currentProduct._id
      );
      console.log(index);
      if (index !== -1) {
        this.isInFavorite = true;
      }
    }
  }

  ToggleFromFavoriteList() {
    if (this.isInFavorite) {
      this.ReqRemoveFromFavorite();
    } else {
      this.ReqAddToFavorite();
    }
  }

  ReqRemoveFromFavorite() {
    this.http
      .delete(
        `https://eshop-iti.herokuapp.com/api/v1/favorite/${this.currentProduct._id}`
      )
      .subscribe({
        next: (data) => {
          this.isInFavorite = false;
        },
        error: (error) => {
          if (error.status === 200) {
            this.isInFavorite = false;
          }
        },
      });
  }

  ReqAddToFavorite() {
    this.http
      .post<any>('https://eshop-iti.herokuapp.com/api/v1/favorite', {
        product: this.currentProduct._id,
      })
      .subscribe((_) => {
        this.isInFavorite = true;
      });
  }

  ReqAddToCart() {
    this.http
      .post<any>('https://eshop-iti.herokuapp.com/api/v1/cart', {
        product: this.currentProduct._id,
        quantity: 1,
      })
      .subscribe((response) => {
        console.log('add to current successfully');
        console.log(response);
      });
  }
}
