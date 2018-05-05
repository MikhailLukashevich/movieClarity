import {Injectable} from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from '@angular/router';

import { map } from 'rxjs/operators';


import { UserService } from './user.service';

@Injectable()
export class UserGuard implements CanActivate {

    constructor(
        private user: UserService,
        private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot) {

            // already authenticated?
        if (this.user.isAuthenticated()) {
            return true; // no changes
        }

        // try to authenticate
    return this.user.authenticate().pipe(

        map((success) => {
  
          if (success) {
  
            return true;
  
          } else {
              // use username & password form
              this.router.navigate(['login']);
          }
          
          return false;
  
        })
  
      );
    
    }
}