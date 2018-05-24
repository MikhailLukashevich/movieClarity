import {
    EventEmitter,
    Injectable
  } from '@angular/core';

  import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders
  } from '@angular/common/http';

  import {Observable} from 'rxjs/Observable';
  import {of} from 'rxjs/observable/of';
  import {map, catchError, finalize} from 'rxjs/operators';

  import {SpinnerService} from './spinner.service';
  import {BehaviorSubject} from 'rxjs/BehaviorSubject';
  import {StorageService} from './storage.service';

  import {User} from '../data/user.model';
  import {Film} from '../data/film.model';


@Injectable()
export class UserService {

    email: string; // user e-mail
    private films: Film[] = null;
    private film: Film = null;
    private user: User;

  authenticated = new EventEmitter<boolean>();

  private USER = 'user_v1';
  private ORIGIN = 'origin_v1';
  // private LOGIN_URL = 'http://206.189.58.168:8080/login';
  private LOGIN_URL = 'http://ym.easy4.fun/api/v1/login/';
  // private LOGOUT_URL = 'http://206.189.58.168:8080/logout';
  private LOGOUT_URL = 'http://ym.easy4.fun/api/v1/logout/';
  private REGISTER_URL = 'http://ym.easy4.fun/api/v1/register/';
  private FILM_URL = 'http://ym.easy4.fun/api/v1/film/';

  constructor(private http: HttpClient,
              private spinner: SpinnerService,
              private storageService: StorageService) {

    this.clear();

  }

  isAuthenticated() {
    return (null != this.email);
  }

  clear() {
    this.email = null;
  }

  authenticate(): Observable<boolean> {
    // reset all attributes
    this.clear();

    // any user credentials?
    const token = this.getToken();
    console.log('token', token);
    if (!token) {
      this.authenticated.emit(false);
      return of(false);
    }

    this.spinner.start();

    // get authenticated user profile
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get<any>(this.LOGIN_URL, {headers: headers}).pipe(
      // parse personal data
      map(data => {
          console.log('MAP 1221');
        try {

          this.user = data;
          console.log('data', data);
          this.email = data['username'];
          this.authenticated.emit(true);
          return true;

        } catch (e) {

          console.error('Unable to parse person profile data.');
          this.clear();
          this.authenticated.emit(false);
          return false;

        }

      }),

      // handle errors
      catchError((error: HttpErrorResponse) => {

        console.log(error);
        this.clear();
        this.authenticated.emit(false);
        return of(false);

      }),

      // stop spinner
      finalize(() => {
        this.spinner.stop();
      })
    );

  }

  getToken() {
    return this.storageService.getItem(this.USER);
  }

  setToken(value: string) {
    this.storageService.setItem(this.USER, value);
  }

  removeToken() {
    this.storageService.removeItem(this.USER);
  }

  login(email: string, password: string) {

    // prepare authentication token
    this.setToken('Basic ' + this.b64EncodeUnicode(email + ':' + password));

    // authenticate
    return this.authenticate();

  }

  logout(): Observable<boolean> {
    const token = this.getToken();

    if (!token) {
      this.authenticated.emit(false);
      return of(false);
    }

    this.spinner.start();
    const headers = new HttpHeaders().set('Authorization', token);

    return new Observable(observer => {
      this.http.get(this.LOGOUT_URL, {
        headers: headers
      }).subscribe(
        () => {
          this.clear();
          this.removeToken();
          this.authenticated.emit(false);
          this.spinner.stop();
          observer.next(true);
        },
        (error) => {
          console.log(error);
          this.spinner.stop();
          observer.next(false);
        }
      );
    });
  }

  getAvatar() {
    return './assets/img/generic_person.jpg';
  }

  // getOrigin(clear?: boolean) {
  //   const url = this.storageService.getItem(this.ORIGIN);
  //   if (clear) {
  //     this.removeOrigin();
  //   }
  //   return url;
  // }
  //
  // setOrigin(value: string) {
  //   this.storageService.setItem(this.ORIGIN, value);
  // }
  //
  // removeOrigin() {
  //   this.storageService.removeItem(this.ORIGIN);
  // }

  b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode(Number('0x' + p1));
      }));
  }

  get userProfile(): any {
    return this.user;
  }

      // getUserProfile() {
      //     return new Promise((resolve, reject) => {
      //         const token = this.getToken();
      //         const headers = new HttpHeaders().set('Authorization', token);
      //     });
      // }

   createUser(data: User): Promise<User>{
      const token = this.getToken();
      return new Promise<User>((resolve, reject) => {
          const headers = new HttpHeaders().set('Authorization', token);
          this.http.post(this.REGISTER_URL, data, {
            headers: headers
          }).subscribe(
              (result: User) => {
                  this.user = new User(result)
              },
              (err) => {
                  reject(err)
              }
          );
      });
   }

    getFilms(): Promise<Film[]> {
      const token = 'Basic eW1hZG1pbjoxMjNlYXN5';
      const headers = new HttpHeaders().set('Authorization', token);
      return new Promise<Film[]>((resolve, reject) => {

          this.http.get(this.FILM_URL, {
              headers: headers
          }).subscribe(
              (result: Film[]) => {
                  this.films = [];
                  // TODO Rebuild using Lodash library
                  for (let i = 0; i < result.length; i++) {
                      this.films[i] = new Film(result[i]);
                  }
                  resolve(this.films);
              },
              (err) => {
                  reject(err);
              }
          )
      });
    }

}
