import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {HeaderService} from "../../services/header.service";
import {CartService} from "../../services/cart.service";

@Component({
    selector: 'app-product',
    providers: [ProductService, HeaderService, CartService],
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    product: any;
    showSuccess: boolean = false;
    showError: boolean = false;

    constructor(private _route: ActivatedRoute,
                private _productService: ProductService,
                private _cart: CartService) { }

    ngOnInit() {
        this._route.paramMap.subscribe(params => {
            let id = parseInt(params.get('id'));
            HeaderService.route = "/product/" + id;
            this.showProduct(id);
        });

        HeaderService.activateBackButton = false;
    }

    showProduct(id: number) {
        this._productService.getProduct(id).subscribe((data) => {
            this.product = data;
        });
    }

    getFloat = (num: string) => {
        return parseFloat(num);
    };

    getInt = (num: string) => {
        return Math.floor(this.getFloat(num));
    };

    addToCart() {
        let added = CartService.addProduct(this.product);
        console.log(CartService.products);

        if(added) {
            this.showSuccess = true;
            this.showError = false;
        } else {
            this.showSuccess = false;
            this.showError = true;
        }
    }

    dismissSuccess() {
        this.showSuccess = false;
    }

    dismissError() {
        this.showError = false;
    }
}
