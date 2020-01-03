import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../../services/header.service";

@Component({
    selector: 'app-checkout',
    providers: [HeaderService],
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        HeaderService.activateBackButton = false;
    }

}
