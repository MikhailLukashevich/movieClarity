import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

import { NguCarouselModule } from '@ngu/carousel';
import 'hammerjs';

import { AppRoutingModule} from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { HeaderComponent } from './common/header/header.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './common/footer/footer.component';
import { ErrorComponent } from './error/error.component';

import {UserService} from './services/user.service';
import {UserGuard} from './services/user-guard.service';
import {StorageService} from './services/storage.service';
import {SpinnerService} from './services/spinner.service';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        HeaderComponent,
        LoginComponent,
        FooterComponent,
        ErrorComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        ClarityModule,
        NguCarouselModule,
        HttpClientModule
    ],
    providers: [
        UserService,
        UserGuard,
        StorageService,
        SpinnerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
