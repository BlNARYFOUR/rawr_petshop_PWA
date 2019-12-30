import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../../services/header.service";
import {CartService} from "../../services/cart.service";

@Component({
    selector: 'app-cart',
    providers: [HeaderService, CartService],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        HeaderService.activateBackButton = true;
    }

    getCart = () => {
        return CartService.products;
    }
}
