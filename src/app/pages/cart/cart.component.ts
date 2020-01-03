import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../../services/header.service";
import {CartService} from "../../services/cart.service";
import {OrderService} from "../../services/order.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-cart',
    providers: [HeaderService, CartService, OrderService],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    shippingInternational: number = 0;

    constructor(private _orderService: OrderService,
                private _router: Router) { }

    ngOnInit() {
        HeaderService.activateBackButton = true;
        HeaderService.menuActive = false;
        this.getMaxShippingCost();
    }

    getCart = () => {
        return CartService.products;
    };

    getMaxShippingCost() {
        this._orderService.getInternationalShipping().subscribe({
            next: (data: any) => {
                console.log(data);
                this.shippingInternational = parseFloat(data[0]['settings']['cost']['value']);
            },
            error: (data: any) => {
                console.log(data.error.error);

                if (data.error) {
                    // TODO
                }
            }
        });
    }

    deleteItem = (id: number) => {
        console.log(id);
        CartService.deleteItem(id);
    };

    decreaseAmount = (product: any) => {
        event.stopPropagation();
        product['cart_amount']--;
        if(product['cart_amount'] < 1) {
            product['cart_amount'] = 1;
        }
        CartService.updateLocalStorage();
    };

    increaseAmount = (product: any) => {
        event.stopPropagation();
        product['cart_amount']++;
        if(999 < product['cart_amount']) {
            product['cart_amount'] = 999;
        }
        CartService.updateLocalStorage();
    };

    onAmountChange = (product: any) => {
        let amount = parseInt((<HTMLInputElement>event.currentTarget).value);

        if(amount < 1) {
            amount = 1;
        } else if(999 < amount) {
            amount = 999;
        }
        product['cart_amount'] = amount;
        CartService.updateLocalStorage();
    };

    editItem = (product: any) => {
        event.stopPropagation();
        product['edit'] = !product['edit'];
    };

    getSubTotal = () => {
        let subtotal = 0;
        CartService.products.forEach((product) => {
            subtotal += product['price'] * product['cart_amount'];
        });

        return subtotal;
    };

    onTryCheckout() {
        if(0 < this.getCart().length) {
            // noinspection JSIgnoredPromiseFromCall
            this._router.navigateByUrl('/checkout')
        }
    }
}
