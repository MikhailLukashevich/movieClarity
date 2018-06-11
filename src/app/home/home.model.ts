export class HomeItem {
    public name: string;
    public rating: number;
    public img: string;
    public genre: string;
    public year: number;

    constructor(name: string, rating: number, img: string, genre: string, year: number) {
        this.name = name;
        this.rating = rating;
        this.img = img;
        this.genre = genre;
        this.year = year
    }
}
