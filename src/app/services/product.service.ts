import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class ProductService {

    constructor(private _http: HttpClient) {

    }

    getAllUrl = environment.apiUrl + 'products';

    urlAuthAddOn = '?consumer_key=' + environment.consumerKey + '&consumer_secret=' + environment.consumerSecret;

    getAllProducts() {
        return this._http.get(this.getAllUrl + this.urlAuthAddOn);
    }
}
