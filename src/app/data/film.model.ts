export class Film {
    public director: string = '';
    public imdb: number = 0;
    public year: string = '';
    public genre: string = '';
    public watched: boolean = false;
    public kp: number = 0;
    public time: string = '';
    public producer: string = '';
    public name: string = '';
    public description: string = '';
    public rating: number = 0;
    public id: number = 0;
    public img: string = '';
    public url: string = '';
    public actors: string = '';
    public country: string = '';

    constructor(film: object) {
        if (film) {
            this.director = film['director'] || '';
            this.imdb = film['imdb'] || 0;
            this.year = film['year'] || '';
            this.genre = film['genre'] || '';
            this.watched = film['watched'] || false;
            this.kp = film['kp'] || 0;
            this.time = film['time'] || '';
            this.producer = film['producer'] || '';
            this.name = film['name'] || '';
            this.description = film['description'] || '';
            this.rating = film['rating'] || 0;
            this.id = film['id'] || 0;
            this.img = film['img'] || '';
            this.url = film['url'] || '';
            this.actors = film['actors'] || '';
            this.country = film['country'] || '';
        }
    }

}
