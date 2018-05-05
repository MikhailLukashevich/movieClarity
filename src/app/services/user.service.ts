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

  @Injectable()
export class UserService {

    email: string; // user e-mail
  private user: any;

  authenticated = new EventEmitter<boolean>();

  private USER = 'user_v1';
  private ORIGIN = 'origin_v1';
  private LOGIN_URL = 'http://206.189.58.168:8080/login';
  private LOGOUT_URL = 'http://206.189.58.168:8080/logout';

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

        try {

          this.user = data;
          this.email = data['login'];

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

}