import { Component, OnInit } from "@angular/core";
import { NguCarousel, NguCarouselService, NguCarouselStore } from '@ngu/carousel';
import { Router, ActivatedRoute, Params } from "@angular/router"

import { HomeItem } from './home.model';
import { Film } from '../data/film.model';
import { MovieService } from '../services/movie.service';
import { UserService } from '../services/user.service';
import { SpinnerService } from '../services/spinner.service';

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{

    public carousel: NguCarousel;
    public carouselStore: NguCarouselStore;
    selectedTitle: string;
    returnedMovie: Film[] = [];
    data: Film[] = [];
    items: Film[] = [];

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private carouselService: NguCarouselService,
                private movieService: MovieService,
                private userService: UserService,
                private spinner: SpinnerService) {}


    ngOnInit() {
        this.carouselService.getData.subscribe((value => {
            console.log(value);
        }), (error1 => {
            console.error(error1);
        }));

        this.carousel = {
            grid: {xs: 1, sm: 2, md: 3, lg: 4, all: 0},
            slide: 1,
            speed: 1200,
            interval: 5000,
            point: {
                visible: true,
                hideOnSingleSlide: true,
                pointStyles: `
          .ngucarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            box-sizing: border-box;
          }
          .ngucarouselPoint li {
            display: inline-block;
            border-radius: 50%;
            background: #6b6b6b;
            padding: 5px;
            margin: 0 3px;
            transition: .4s;
          }
          .ngucarouselPoint li.active {
              border: 2px solid rgba(0, 0, 0, 0.55);
              transform: scale(1.2);
              background: transparent;
            }
        `
            },
            load: 3,
            touch: true,
            loop: true,
            easing: 'ease',
            animation: 'lazy'
        }

        // this.activatedRoute.params.forEach((params: Params) => {
        //     this.selectedTitle = params["name"];
        //     if (this.data) {
        //         this.movieService
        //             .getAll()
        //             .then(result => this.data = result);
        //     }
        // });

        this.loadFilms();
    }

    abc() {
        this.activatedRoute.params.forEach((params: Params) => {
            this.selectedTitle = params["name"];
            if (this.data) {
                this.movieService
                    .getAll()
                    .then(result => this.data = result);
            }
        });
    }

    loadFilms() {
        this.spinner.start();
        this.userService.getFilms()
            .then((result: Film[]) => {
                this.data = result;
                this.returnedMovie = this.data.slice(0, 10);
                this.items = this.returnedMovie;
                this.abc();
                this.spinner.stop();
            })
            .catch((err) => {
                this.data = null;
                console.log('ERROR', err)
                this.spinner.stop();
            });
    }

    initDataFn(carouselStore: NguCarouselStore ) {
        this.carouselStore = carouselStore;
    }

    public carouselLoad() {
//    console.log('carouselLoad');
    }

    afterCarouselViewedFn(carouselStore: NguCarouselStore) {
        this.carouselStore = carouselStore;
    }

    onmoveFn(carouselStore: NguCarouselStore) {
        this.carouselStore = carouselStore;
    }

    onSelect(selected: Film) {
        this.router.navigate(["/details", selected.name]);
    }

    paginate(event): void {
        const startItem = (event.page) * event['rows'];
        const endItem = (event.page + 1) * event['rows'];

        this.returnedMovie = this.data.slice(startItem, endItem);
        this.items = this.returnedMovie;
    }
}
