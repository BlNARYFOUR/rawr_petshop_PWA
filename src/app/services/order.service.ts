import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class OrderService {

    constructor(private _http: HttpClient) { }

    getCountryListUrl = environment.apiUrl + 'data/countries';
    getInternationalShippingPriceUrl = environment.apiUrl + 'shipping/zones/0/methods';

    urlAuthAddOn = '?consumer_key=' + environment.consumerKey + '&consumer_secret=' + environment.consumerSecret;

    getCountryList() {
        return this._http.get(this.getCountryListUrl + this.urlAuthAddOn);
    }

    getInternationalShipping() {
        return this._http.get(this.getInternationalShippingPriceUrl + this.urlAuthAddOn);
    }
}
