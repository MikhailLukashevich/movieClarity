import {Film} from './film.model';
import * as _ from 'lodash';

export class User {
    public password: string = '';
    public username: string = '';
    public films: Film[];

    constructor(user: object) {
        if (user) {
            this.password = user['password'] || '';
            this.username = user['username'] || '';
            const films = user['films'];
            this.films = [];
            if (_.isArray(films)) {
                for (const film of films) {
                    this.films.push(new Film(film));
                }
            }
        }
    }
}
