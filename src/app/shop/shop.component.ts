import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductDB } from '../product.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: [],
})
export class ShopComponent implements OnInit {
  allLoadedProducts: ProductDB[] = [];
  loadedProducts: ProductDB[] = [];
  category: string;
  // userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
  idsInFavoriteList: string[];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.params['category'];
    if (this.category) {
      this.fetchProducts(this.category);
    }
    this.fetchProducts('');
    this.getFavoritesIdProduct();
  }

  ngOnChanges(): void {}

  private fetchProducts(category: string) {
    if (category) {
      this.http
        .get<ProductDB[]>(
          `https://eshop-iti.herokuapp.com/api/v1/products/category/${category}`
        )
        .subscribe((products) => {
          this.loadedProducts = products;
          this.allLoadedProducts = products;
        });
    } else {
      this.http
        .get<ProductDB[]>('https://eshop-iti.herokuapp.com/api/v1/products')
        .subscribe((products) => {
          this.loadedProducts = products;
          this.allLoadedProducts = products;
        });
    }
  }

  getFavoritesIdProduct() {
    this.http
      .get<{ product: ProductDB; dataListed: string }[]>(
        'https://eshop-iti.herokuapp.com/api/v1/favorite'
      )
      .pipe(
        map((responseData) => {
          const myIdsInFavoriteList: string[] = [];
          for (const ele of responseData) {
            myIdsInFavoriteList.push(ele.product._id);
          }
          return myIdsInFavoriteList;
        })
      )
      .subscribe((myIdsInFavoriteList) => {
        this.idsInFavoriteList = myIdsInFavoriteList;
        console.log(this.idsInFavoriteList);
      });
  }

  resetProducts() {
    this.loadedProducts = [];
    this.allLoadedProducts.forEach((val) =>
      this.loadedProducts.push(Object.assign({}, val))
    );
  }

  filterByPriceParent(newItem: { min: number; max: number }) {
    this.resetProducts();
    this.loadedProducts = this.allLoadedProducts.filter((ele) => {
      return ele.price >= newItem.min && ele.price <= newItem.max;
    });
  }

  filterBySizeParent(size: string) {
    this.resetProducts();
    this.loadedProducts = this.allLoadedProducts.filter((ele) => {
      return ele.sizes.includes(size);
    });
  }

  filterByColorParent(color: string) {
    this.resetProducts();
    this.loadedProducts = this.allLoadedProducts.filter((ele) => {
      for (const objColor of ele.colors) {
        if (objColor.colorName == color) {
          return true;
        }
      }
      return false;
    });
  }
}
