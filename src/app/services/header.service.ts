import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

    public static activateBackButton = false;
    public static route = "/";

    constructor() { }

}
