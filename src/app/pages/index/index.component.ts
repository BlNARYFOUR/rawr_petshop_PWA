import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";

@Component({
    selector: 'app-index',
    providers: [ProductService],
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    products: any;

    constructor(private _productService: ProductService) { }

    ngOnInit() {
        this.showProducts();
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
