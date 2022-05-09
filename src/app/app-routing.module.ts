import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShopDeatilsComponent } from './shop-deatils/shop-deatils.component';
import { ShopComponent } from './shop/shop.component';
import { CheckoutComponent } from './shopping-cart/checkout/checkout.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserdeatilsComponent } from './userdeatils/userdeatils.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop/:category', component: ShopComponent },
  { path: 'shop/details/:productId', component: ShopDeatilsComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'favorite', component: FavoriteListComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }, //
  // { path: '**', pathMatch: 'full', component: HomeComponent },
  { path: 'userdeatils', component: UserdeatilsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
