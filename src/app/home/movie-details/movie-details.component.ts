import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { MovieService } from '../../services/movie.service';

import { HomeItem } from '../home.model';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

    movie: HomeItem;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private service: MovieService) {
    }

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let title = params['id'];
            this.service
                .getMovie(title)
                .then(result => this.movie = result);
        });
    }

}
