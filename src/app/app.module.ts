import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ROUTING } from "./app.routing";
import { NguCarouselModule } from '@ngu/carousel';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { HeaderComponent } from './common/header/header.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        HeaderComponent,
        LoginComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        ClarityModule,
        NguCarouselModule,
        ROUTING
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
