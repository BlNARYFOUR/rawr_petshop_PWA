import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './sharedComponents/header/header.component';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        HeaderComponent,
        CartComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
