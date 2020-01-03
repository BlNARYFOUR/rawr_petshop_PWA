import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../../services/header.service";
import {Router} from "@angular/router";
import {CartService} from "../../services/cart.service";

@Component({
    selector: 'app-header',
    providers: [HeaderService, CartService],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private _headerService: HeaderService,
                private _router: Router) { }

    ngOnInit() {
    }

    getMenuState = () => {
        return HeaderService.menuActive;
    };

    onHamburgerClick = () => {
        HeaderService.menuActive = !HeaderService.menuActive;
    };

    isBackArrowActive = () => {
        return HeaderService.activateBackButton;
    };

    routeOnClick() {
        this._router.navigateByUrl(HeaderService.route);
    }

    getCartSize = () => {
        return CartService.products.length;
    }
}
