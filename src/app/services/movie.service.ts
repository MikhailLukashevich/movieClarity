import { Injectable } from '@angular/core';

import { HomeItem } from '../home/home.model';

let movies = [
    new HomeItem('The Fast And The Furious', 1, '../../images/action.jpg', 'action', 1920),
    new HomeItem('Disney', 1, '../../images/cartoon.jpg', 'action', 1920),
    new HomeItem('One day', 1, '../../images/drama.jpg', 'action', 1920),
    new HomeItem('Ural dumplings', 1, '../../images/comedy.jpg', 'action', 1920),
    new HomeItem('Documentary', 1, '../../images/documentary.jpg', 'action', 1920),
    new HomeItem('Alone home', 1, '../../images/aloneHome.jpg', 'action', 1920)
];

let moviesPromise = Promise.resolve(movies);

@Injectable()

export class MovieService {

    getAll(): Promise<HomeItem[]> {
        return moviesPromise;
    }

    getMovie(title: string): Promise<HomeItem> {
        return moviesPromise
            .then(movies => movies.find(x => x.title == title));
    }
}
