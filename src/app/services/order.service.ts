import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class OrderService {

    constructor(private _http: HttpClient) { }

    getCountryListUrl = environment.apiUrl + 'data/countries';
    getInternationalShippingPriceUrl = environment.apiUrl + 'shipping/zones/0/methods';
    getNationalShippingPriceUrl = environment.apiUrl + 'shipping/zones/1/methods';
    getPaymentMethodUrl = environment.apiUrl + "payment_gateways/";
    postOrderUrl = environment.apiUrl + "orders";


    urlAuthAddOn = '?consumer_key=' + environment.consumerKey + '&consumer_secret=' + environment.consumerSecret;

    getCountryList() {
        return this._http.get(this.getCountryListUrl + this.urlAuthAddOn);
    }

    getInternationalShipping() {
        return this._http.get(this.getInternationalShippingPriceUrl + this.urlAuthAddOn);
    }

    getNationalShipping() {
        return this._http.get(this.getNationalShippingPriceUrl + this.urlAuthAddOn);
    }

    getPaymentMethod(id: string) {
        return this._http.get(this.getPaymentMethodUrl + id + this.urlAuthAddOn);
    }

    postNewOrder(data: any) {
        return this._http.post(this.postOrderUrl + this.urlAuthAddOn, data);
    }
}
