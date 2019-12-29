import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../../services/header.service";

@Component({
    selector: 'app-cart',
    providers: [HeaderService],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        HeaderService.activateBackButton = true;
    }

}
