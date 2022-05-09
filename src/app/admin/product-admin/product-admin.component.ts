import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ProductDB } from 'src/app/product.model';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss'],
})
export class ProductAdminComponent implements OnInit {
  @Input() currentProduct: ProductDB;
  @Input() pageName: string;
  @Input() ProductsInFavoriteList: ProductDB[]; // in favorite page only
  @Input() idsInFavoriteList: string[]; // in shop page only
  isInFavorite: boolean = false;

  constructor(private http: HttpClient, public dialog: MatDialog) {}
  ngOnInit(): void {
    // this.checkIfInFavoriteList();
  }

  ngOnChanges(): void {
    // this.checkIfInFavoriteList();
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      height: '90%',
      width: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
