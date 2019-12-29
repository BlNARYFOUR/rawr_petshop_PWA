import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {HeaderService} from "../../services/header.service";

@Component({
    selector: 'app-product',
    providers: [ProductService, HeaderService],
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    product: any;

    constructor(private _route: ActivatedRoute,
                private _productService: ProductService) { }

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
            console.log(data)
        });
    }

    getFloat = (num: string) => {
        return parseFloat(num);
    };

    getInt = (num: string) => {
        return Math.floor(this.getFloat(num));
    };
}
