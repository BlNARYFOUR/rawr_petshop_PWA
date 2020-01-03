import { Injectable } from '@angular/core';

@Injectable()
export class HeaderService {

    public static menuActive = false;
    public static activateBackButton = false;
    public static route = "/";

    constructor() { }

}
