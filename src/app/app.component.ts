import {Component, OnInit} from '@angular/core';
import {CartService} from "./services/cart.service";

@Component({
    selector: 'app-root',
    providers: [CartService],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'PWA';

    constructor() {

    }

    ngOnInit() {
        CartService.loadFromLocalStorage();
    }
}
