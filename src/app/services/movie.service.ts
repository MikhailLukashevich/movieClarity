import { Injectable } from '@angular/core';

// import { HomeItem } from '../home/home.model';
import { Film } from '../data/film.model';
import { SpinnerService } from './spinner.service';
import { UserService } from './user.service';

// let movies = [
//     new HomeItem('The Fast And The Furious', 1, '../../images/action.jpg', 'action', 1920),
//     new HomeItem('Disney', 1, '../../images/cartoon.jpg', 'action', 1920),
//     new HomeItem('One day', 1, '../../images/drama.jpg', 'action', 1920),
//     new HomeItem('Ural dumplings', 1, '../../images/comedy.jpg', 'action', 1920),
//     new HomeItem('Documentary', 1, '../../images/documentary.jpg', 'action', 1920),
//     new HomeItem('Alone home', 1, '../../images/aloneHome.jpg', 'action', 1920),
//     new HomeItem('Ural dumplings', 1, '../../images/comedy.jpg', 'action', 1920),
//     new HomeItem('Documentary', 1, '../../images/documentary.jpg', 'action', 1920),
//     new HomeItem('Alone home', 1, '../../images/aloneHome.jpg', 'action', 1920)
// ];
// let moviesPromise = Promise.resolve(movies);
let moviesPromise;

@Injectable()

export class MovieService {

    data: Film[];
    constructor(private spinner: SpinnerService,
                private userService: UserService) {
        this.userService.getFilms()
            .then((result: Film[]) => {
                this.data = result;
                moviesPromise = Promise.resolve(this.data);
                this.spinner.stop();
            })
            .catch((err) => {
                this.data = null;
                console.log('ERROR', err)
                this.spinner.stop();
            });
    }

    getAll(): Promise<Film[]> {
        return moviesPromise;
    }

    // getAllTest(){
    //     return movies;
    // }

    getMovie(name: string): Promise<Film> {
        if (moviesPromise) {
            return moviesPromise
                .then(movies => movies.find(x => x.name == name));
        }
    }
}
