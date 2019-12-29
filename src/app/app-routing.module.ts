import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from "./pages/index/index.component";
import {CartComponent} from "./pages/cart/cart.component";
import {ProductComponent} from "./pages/product/product.component";


const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'cart', component: CartComponent },
    { path: 'product/:id', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
