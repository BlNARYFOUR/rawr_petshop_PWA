import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from "./pages/index/index.component";
import {CartComponent} from "./pages/cart/cart.component";
import {ProductComponent} from "./pages/product/product.component";
import {CheckoutComponent} from "./pages/checkout/checkout.component";


const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'cart', component: CartComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'checkout', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
