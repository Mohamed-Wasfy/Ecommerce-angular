import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from './category.model';

@Component({
  selector: 'app-shop-according',
  templateUrl: './shop-according.component.html',
  styleUrls: ['./shop-according.component.scss'],
})
export class ShopAccordingComponent implements OnInit {

  categories: Category[] = [];
  @Output() filterByPriceEvent = new EventEmitter<{ min: number; max: number }>();
  @Output() filterBySizeEvent = new EventEmitter<string>();
  @Output() filterColorEvent = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  filterByPriceParent(event: any) {
    this.filterByPriceEvent.emit({
      min: parseInt(event.target.getAttribute('data-minSalary')),
      max: parseInt(event.target.getAttribute('data-maxSalary')),
    });
  }

  filterBySizeChild(event: any) {
    if (event.target.localName == 'label') {
      this.filterBySizeEvent.emit(event.target.getAttribute('for'))
    }
  }

  filterByColorChild(event:any){
    if (event.target.localName == 'label') {
      this.filterColorEvent.emit(event.target.getAttribute('for'))
    }
  }

  private fetchProducts() {
    this.http
      .get<Category[]>('https://eshop-iti.herokuapp.com/api/v1/categories')
      .subscribe((categories) => {
        this.categories = categories;
      });
  }
}
