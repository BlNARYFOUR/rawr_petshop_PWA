import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../../services/header.service";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
import {OrderService} from "../../services/order.service";

@Component({
    selector: 'app-checkout',
    providers: [HeaderService, CartService, OrderService],
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    countryList: any = [];
    orderPlaced: boolean = false;

    constructor(private _router: Router,
                private _orderService: OrderService) { }

    ngOnInit() {
        HeaderService.activateBackButton = false;

        if(this.getCart().length <= 0) {
            // noinspection JSIgnoredPromiseFromCall
            // this._router.navigateByUrl("/cart");
        } else {
            this.showCountryList();
        }
    }

    getCart = () => {
        return CartService.products;
    };

    showCountryList = () => {
        this._orderService.getCountryList().subscribe({
            next: (data: any) => {
                console.log(data);
            },
            error: (data: any) => {
                console.log(data.error.error);

                if (data.error) {
                    // TODO
                }
            }
        });
    };
}
