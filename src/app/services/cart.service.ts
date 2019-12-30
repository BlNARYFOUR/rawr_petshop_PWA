import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
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
    }

    public static addProduct(product: any) {
        if(!CartService.containsProduct(product)) {
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
