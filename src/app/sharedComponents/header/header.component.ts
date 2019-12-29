import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../../services/header.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    providers: [HeaderService],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    toggleMenu: boolean = false;

    constructor(private _headerService: HeaderService,
                private _router: Router) { }

    ngOnInit() {
    }

    onHamburgerClick() {
        this.toggleMenu = !this.toggleMenu;
    }

    isBackArrowActive = () => {
        return HeaderService.activateBackButton;
    };

    routeOnClick() {
        this._router.navigateByUrl(HeaderService.route);
    }
}
