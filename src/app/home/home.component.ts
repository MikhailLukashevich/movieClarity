import { Component, OnInit } from "@angular/core";
import {NguCarousel, NguCarouselService, NguCarouselStore} from '@ngu/carousel';

import { HomeItem } from './home.model';

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{

    public items: HomeItem[] = [];
    public carousel: NguCarousel;
    public carouselStore: NguCarouselStore;

    constructor(private carouselService: NguCarouselService) {
    }


    ngOnInit() {
        this.items = [
            new HomeItem('The Fast And The Furious', 1, '../../images/action.jpg', 'action', 1920),
            new HomeItem('Disney', 1, '../../images/cartoon.jpg', 'action', 1920),
            new HomeItem('One day', 1, '../../images/drama.jpg', 'action', 1920),
            new HomeItem('Ural dumplings', 1, '../../images/comedy.jpg', 'action', 1920),
            new HomeItem('Documentary', 1, '../../images/documentary.jpg', 'action', 1920),
            new HomeItem('Alone home', 1, '../../images/aloneHome.jpg', 'action', 1920)
        ];

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
}
