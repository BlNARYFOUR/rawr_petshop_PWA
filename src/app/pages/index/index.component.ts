import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {HeaderService} from "../../services/header.service";

@Component({
    selector: 'app-index',
    providers: [ProductService, HeaderService],
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    products: any;

    constructor(private _productService: ProductService) { }

    ngOnInit() {
        this.showProducts();
        HeaderService.route = "/";
        HeaderService.activateBackButton = false;
        HeaderService.menuActive = false;
    }

    showProducts() {
        this._productService.getAllProducts().subscribe({
            next: (data: any) => {
                console.log(data);
                this.products = data;
            },
            error: (data: any) => {
                console.log(data.error.error);

                if (data.error) {
                    // TODO
                }
            }
        });
    }
}
