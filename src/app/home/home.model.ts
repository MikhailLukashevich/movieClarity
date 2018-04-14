export class HomeItem{
    public title: string;
    public rating: number;
    public img: string;
    public genre: string;
    public year: number;

    constructor(title: string, rating: number, img: string, genre: string, year: number){
        this.title = title;
        this.rating = rating;
        this.img = img;
        this.genre = genre;
        this.year = year
    }
}
