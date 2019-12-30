import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

    public static products: any = [];

    constructor() {}

    public static updateLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(CartService.products));
    }

    public static loadFromLocalStorage() {
        let data = localStorage.getItem("cart");

        if(data !== null) {
            CartService.products = JSON.parse(data);
        }

        CartService.products.forEach((product) => {product['edit'] = false});
    }

    public static deleteItem(id: number) {
        for(let i = CartService.products.length - 1; 0 <= i; i--) {
            if(CartService.products[i]['id'] === id) {
                CartService.products.splice(i, 1);
            }
        }

        CartService.updateLocalStorage();
    }

    public static addProduct(product: any) {
        if(!CartService.containsProduct(product)) {
            product['cart_amount'] = 1;
            CartService.products.push(product);
            CartService.updateLocalStorage();
            return true;
        } else {
            return false;
        }
    }

    public static containsProduct(product: any) {
        let found = false;

        CartService.products.forEach((_product) => {
            if(_product['id'] === product['id']) {
                found = true;
            }
        });

        return found;
    }
}
