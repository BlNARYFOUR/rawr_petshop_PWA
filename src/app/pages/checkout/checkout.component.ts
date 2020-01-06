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
    shippingCost: number = 0;
    orderPlaced: boolean = false;
    paymentMethod: any;
    checkoutData: any;
    showSuccess: boolean = false;
    showError: boolean = false;
    orderKey: string;
    subTotal: number = 0.0;
    shippingAddressEqualsBillingAddress: boolean = false;

    constructor(private _router: Router,
                private _orderService: OrderService) { }

    ngOnInit() {
        HeaderService.activateBackButton = false;

        if(this.getCart().length <= 0) {
            // noinspection JSIgnoredPromiseFromCall
            // this._router.navigateByUrl("/cart");
        } else {
            this.showCountryList();
            this.getSubTotal();
            this.getPaymentMethodDetails();
        }
    }

    getCart = () => {
        return CartService.products;
    };

    showCountryList = () => {
        this._orderService.getCountryList().subscribe({
            next: (data: any) => {
                this.countryList = data;
                this.updateShippingCost();
            },
            error: (data: any) => {
                console.log(data.error.error);

                if (data.error) {
                    // TODO
                }
            }
        });
    };

    getSubTotal = () => {
        let subtotal = 0;
        CartService.products.forEach((product) => {
            subtotal += product['price'] * product['cart_amount'];
        });

        this.subTotal = subtotal;
    };

    getPaymentMethodDetails = () => {
        this._orderService.getPaymentMethod(document.querySelector("#payment_method")['value']).subscribe({
            next: (data: any) => {
                this.paymentMethod = data;
            },
            error: (data: any) => {
                console.log(data.error.error);

                if (data.error) {
                    // TODO
                }
            }
        });
    };

    getInternationalShipping = () => {
        this._orderService.getInternationalShipping().subscribe({
            next: (data: any) => {
                this.shippingCost = parseFloat(data[0]['settings']['cost']['value']);
            },
            error: (data: any) => {
                console.log(data.error.error);

                if (data.error) {
                    // TODO
                }
            }
        });
    };

    getNationalShipping = () => {
        this._orderService.getNationalShipping().subscribe({
            next: (data: any) => {
                this.shippingCost = parseFloat(data[0]['settings']['cost']['value']);
            },
            error: (data: any) => {
                console.log(data.error.error);

                if (data.error) {
                    // TODO
                }
            }
        });
    };

    updateShippingCost = () => {
        let countryCode = document.querySelector("#country_shipping")['value'];

        if(countryCode === "BE") {
            this.getNationalShipping();
        } else {
            this.getInternationalShipping();
        }
    };

    buildCheckoutData = () => {
        this.checkoutData = {
            "payment_method": this.paymentMethod.id,
            "payment_method_title": this.paymentMethod.title,
            "set_paid": false,
            "billing": this.getFormAsJson('billing_address_form'),
            "shipping": this.shippingAddressEqualsBillingAddress ? this.getFormAsJson('billing_address_form') : this.getFormAsJson('shipping_address_form'),
            "line_items": this.getBasicCartInfo(),
            "shipping_lines": [
                {
                    "method_id": "flat_rate",
                    "method_title": "Flat Rate",
                    "total": this.shippingCost.toString()
                }
            ]
        }
    };

    getFormAsJson = (id: string) => {
        let data = {};
        let fields = document.querySelector('#' + id)['elements'];

        for(let i=0; i < fields.length; i++) {
            data[fields[i].name] = fields[i].value;
        }

        return data;
    };

    getBasicCartInfo = () => {
        let cartItems = [];

        CartService.products.forEach((p) => {
            cartItems.push({
                product_id: p.id,
                quantity: p.cart_amount
            });
        });

        return cartItems;
    };

    getFieldValue = (id: string) => {
        return document.querySelector('#' + id)['value'];
    };

    submitOrder = () => {
        this._orderService.postNewOrder(this.checkoutData).subscribe({
            next: (data: any) => {
                this.orderKey = data['order_key'].split('_')[2];
                this.showSuccess = true;
                this.showError = false;
                CartService.products = [];
                localStorage.clear();
                this.orderPlaced = false;
            },
            error: (data: any) => {
                this.showError = true;
                this.showSuccess = false;
                this.orderPlaced = false;
                console.log(data.error.error);

                if (data.error) {
                    // TODO
                }
            }
        });
    };

    onTryOrder() {
        this.orderPlaced = true;
        this.buildCheckoutData();
        this.submitOrder();
        console.log(this.checkoutData);
        console.log(CartService.products);
    }

    onShippingAddressTypeChange = () => {
        this.shippingAddressEqualsBillingAddress = document.querySelector("#same_as_billing_shipping")['checked'];
    };
}
