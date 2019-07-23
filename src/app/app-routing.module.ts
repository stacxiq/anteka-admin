import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'addproducts', loadChildren: './addproducts/addproducts.module#AddproductsPageModule' },
  { path: 'addproduct', loadChildren: './addproduct/addproduct.module#AddproductPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'adminproducts', loadChildren: './adminproducts/adminproducts.module#AdminproductsPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'friends', loadChildren: './friends/friends.module#FriendsPageModule' },
  { path: 'paid', loadChildren: './paid/paid.module#PaidPageModule' },
  { path: 'paiddetail', loadChildren: './paiddetail/paiddetail.module#PaiddetailPageModule' },
  { path: 'products', loadChildren: './products/products.module#ProductsPageModule' },
  { path: 'products:id', loadChildren: './products/products.module#ProductsPageModule' },
  { path: 'addproduct:id', loadChildren: './addproduct/addproduct.module#AddproductPageModule' },
  { path: 'cartdetail:id', loadChildren: './paiddetail/paiddetail.module#PaiddetailPageModule' },
  { path: 'usercart', loadChildren: './usercart/usercart.module#UsercartPageModule' },
  { path: 'cartdetail', loadChildren: './cartdetail/cartdetail.module#CartdetailPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
