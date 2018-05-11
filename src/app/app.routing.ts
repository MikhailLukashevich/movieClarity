import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component'
import { MovieDetailsComponent } from './home/movie-details/movie-details.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserGuard } from './services/user-guard.service';


const appRoutes: Routes = [
     {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [UserGuard]
    },
    {
        path: "details/:id",
        component: MovieDetailsComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'about',
      component: AboutComponent
    },
    {
      path: 'not-found',
      component: ErrorComponent,
      canActivate: [UserGuard],
      data: {message: 'Page not found!'}
    },
    {
      path: '**',
      redirectTo: '/not-found'
    }
];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
  })

  export class AppRoutingModule {
  }
