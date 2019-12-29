import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../../services/header.service";

@Component({
    selector: 'app-header',
    providers: [HeaderService],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    toggleMenu: boolean = false;

    constructor(private _headerService: HeaderService) { }

    ngOnInit() {
    }

    onHamburgerClick() {
        this.toggleMenu = !this.toggleMenu;
    }

    isBackArrowActive = () => {
        return HeaderService.activateBackButton;
    };
}
