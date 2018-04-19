import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    isHiddenFooter = false;
    constructor(private router: Router) {
        this.router.events.subscribe(
            (event) => {

                if (event instanceof NavigationEnd) {
                    this.isHiddenFooter =  (this.router.url === '/login');
                }
            }
        );
    }
}
