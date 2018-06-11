import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import {ClrWizard} from "@clr/angular";

import { UserService } from '../services/user.service';
import { SpinnerService } from '../services/spinner.service';

import { HomeItem } from '../home/home.model';
import { Film } from "../data/film.model";
import { User } from "../data/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    items: HomeItem[] = [];
    data: Film[] = [];
    listFilm_1: Film[] = [];
    listFilm_2: Film[] = [];
    listFilm_3: Film[] = [];
    listFilm_4: Film[] = [];
    listFilm_5: Film[] = [];
    user: User = new User(null);

    @ViewChild("wizardlg") wizardLarge: ClrWizard;
    lgOpen: boolean = false;

    userForm: FormGroup;
    userFormRegistration: FormGroup;
    subscrValueChange: Subscription;
    subscrValueChangeRegistration: Subscription;
    message: string = null;
    formEnable: boolean = true;
    FieldInValid: boolean;
    isEnter: boolean = true;
    error: String;


    formErrors = {
        'email': '',
        'password': '',
        'emailRegistration': '',
        'passwordRegistration1': '',
        'passwordRegistration2': ''
    };

    validationMessages = {
        'email': {
            'required': 'Укажите Ваш логин.',
        },
        'password': {
            'required': 'Укажите Ваш пароль.'
        },
        'emailRegistration': {
            'required': 'Укажите Ваш логин.',
        },
        'passwordRegistration1': {
            'required': 'Укажите Ваш пароль.'
        },
        'passwordRegistration2': {
            'required': 'Укажите Ваш пароль.'
        }
    };

    constructor(private fb: FormBuilder,
                private router: Router,
                private userService: UserService,
                private spinner: SpinnerService) { }

    ngOnInit() {
        this.createForm();

        this.items = [
            new HomeItem('The Fast And The Furious', 1, '../../images/action.jpg', 'action', 1920),
            new HomeItem('Disney', 1, '../../images/cartoon.jpg', 'action', 1920),
            new HomeItem('One day', 1, '../../images/drama.jpg', 'action', 1920),
            new HomeItem('Ural dumplings', 1, '../../images/comedy.jpg', 'action', 1920),
            new HomeItem('Documentary', 1, '../../images/documentary.jpg', 'action', 1920),
            new HomeItem('Alone home', 1, '../../images/aloneHome.jpg', 'action', 1920)
        ];
    }

    createForm() {
        this.userForm = this.fb.group({
            'email': [
                {
                    value: '',
                    disabled: false
                },
                [
                    Validators.required,
                    // Validators.pattern('[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')
                ]
            ],
            'password': [
                {
                    value: '',
                    disabled: false
                },
                [
                    Validators.required
                ]
            ]
        });

        this.userFormRegistration = this.fb.group({
            'emailRegistration': [
                {
                    value: '',
                    disabled: false
                },
                [
                    Validators.required
                ]
            ],
            'passwordRegistration1': [
                {
                    value: '',
                    disabled: false
                },
                [
                    Validators.required
                ]
            ],
            'passwordRegistration2': [
                {
                    value: '',
                    disabled: false
                },
                [
                    Validators.required
                ]
            ]
        });

        this.subscrValueChange = this.userForm.valueChanges
            .subscribe(data => this.onValueChange(data));

        this.onValueChange(this.userForm);


        this.subscrValueChangeRegistration = this.userFormRegistration.valueChanges
            .subscribe(data => this.onValueChangeRegistration(data));
        this.onValueChangeRegistration(this.userFormRegistration);

        this.loadFilms();

    }

    loadFilms() {
        this.spinner.start();
        this.userService.getFilms()
            .then((result: Film[]) => {
                this.data = result;
                this.divideListFilms(this.data);
                this.spinner.stop();
            })
            .catch((err) => {
                this.data = null;
                console.log('ERROR', err)
                this.spinner.stop();
            });
    }

    divideListFilms (data: Film[]) {
        this.listFilm_1 = data.slice(0, 20);
        this.listFilm_2 = data.slice(21, 40);
        this.listFilm_3 = data.slice(41, 60);
        this.listFilm_4 = data.slice(61, 80);
        this.listFilm_5 = data.slice(81, 100);

    }

    onValueChangeRegistration(data?: any) {
        if (!this.userFormRegistration) {
            return;
        }
        const form = this.userFormRegistration;
        this.message = null;

        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                this.formErrors[field] = '';

                const control = form.get(field);

                if (control  && !control.valid) {
                    const message = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += message[key] + ' ';
                        }
                    }
                }
            }
        }
    }

    onValueChange(data?: any) {
        if (!this.userForm) {
            return;
        }
        const form = this.userForm;
        this.message = null;

        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                this.formErrors[field] = '';

                const control = form.get(field);

                if (control  && !control.valid) {
                    const message = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += message[key] + ' ';
                        }
                    }
                }
            }
        }
    }

    isFieldInvalid(field: string) {
        if (this.formEnable && this.FieldInValid) {
            return !this.userForm.get(field).valid && this.userForm.get(field).touched;
        }
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
                const message = this.validationMessages[field];
                this.formErrors[field] = '';
                this.isFieldInvalid(field);
                for (const key in control.errors) {
                    if (control.errors.hasOwnProperty(key)) {
                        this.formErrors[field] += message[key] + ' ';
                    }
                }
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    onSubmit() {
        this.FieldInValid = true;
        this.onValueChange();
        console.log("this.userForm.valid:  ", this.userForm.valid);
        const username = this.userForm.value.email;
        const password = this.userForm.value.password;
        if (this.userForm.valid) {
            this.userService.login(username, password).subscribe(
                (success) => {

                  if (success) {

                    console.log('all is good!!!')
                    this.router.navigate(['/']);
                    // console.log('test message');

                  } else {
                    // place error handling here
                    this.error = 'Пожалуйста, проверьте Ваш логин или пароль.';
                    console.log('Пожалуйста, проверьте Ваш логин или пароль.');
                    // this.blockButton = false;
                      this.router.navigate(['/']);
                  }

                },
                (error) => {
                  console.log(error);
                  // place error handling here
                }
              ); this.router.navigate(['/']);

        } else {
            this.validateAllFormFields(this.userForm);
        }
    }

    onOpen() {
        this.lgOpen = true;
    }

    testError(field) {

        let passwordRegistration1 =  this.userFormRegistration.get('passwordRegistration1').value;
        let passwordRegistration2 =  this.userFormRegistration.get('passwordRegistration2').value;
        if (this.userFormRegistration.get('passwordRegistration1').touched && this.userFormRegistration.get('passwordRegistration2').touched && (passwordRegistration1 === passwordRegistration2)) {
        }

        if (this.userFormRegistration.get(field)) {
            return !this.userFormRegistration.get(field).valid && this.userFormRegistration.get(field).touched;
        }

    }

    isPasswordEqual() {
        let passwordRegistration1 =  this.userFormRegistration.get('passwordRegistration1').value;
        let passwordRegistration2 =  this.userFormRegistration.get('passwordRegistration2').value;
        return (passwordRegistration1 === passwordRegistration2);
    }

    onNext() {
        if (this.userFormRegistration.valid && this.isPasswordEqual()) {
            return false;
        } else {return true; }
    }

    onSelectListFilm_1(item) {
        for (let i = 0; i < this.listFilm_1.length; i++) {
            if (this.listFilm_1[i]['name'] === item['name']) {
                this.listFilm_1[i]['watched'] = !this.listFilm_1[i]['watched'];
            }
        }
    }

    onSelectListFilm_2(item) {
        for (let i = 0; i < this.listFilm_2.length; i++) {
            if (this.listFilm_2[i]['name'] === item['name']) {
                this.listFilm_2[i]['watched'] = !this.listFilm_2[i]['watched'];
            }
        }
    }

    onSelectListFilm_3(item) {
        for (let i = 0; i < this.listFilm_3.length; i++) {
            if (this.listFilm_3[i]['name'] === item['name']) {
                this.listFilm_3[i]['watched'] = !this.listFilm_3[i]['watched'];
            }
        }
    }

    onSelectListFilm_4(item) {
        for (let i = 0; i < this.listFilm_4.length; i++) {
            if (this.listFilm_4[i]['name'] === item['name']) {
                this.listFilm_4[i]['watched'] = !this.listFilm_4[i]['watched'];
            }
        }
    }

    onSubmitRegister() {
        this.user.films = [];
        this.user.username = this.userFormRegistration.value.emailRegistration;
        this.user.password = this.userFormRegistration.value.passwordRegistration1;
        const list = [];
        for (let i = 0; i < this.listFilm_1.length; i++) {
            if (this.listFilm_1[i]['watched']) {
                list.push(this.listFilm_1[i]);
            }
        }
        for (let i = 0; i < this.listFilm_2.length; i++) {
            if (this.listFilm_2[i]['watched']) {
                list.push(this.listFilm_2[i]);
            }
        }
        for (let i = 0; i < this.listFilm_3.length; i++) {
            if (this.listFilm_3[i]['watched']) {
                list.push(this.listFilm_3[i]);
            }
        }
        for (let i = 0; i < this.listFilm_4.length; i++) {
            if (this.listFilm_4[i]['watched']) {
                list.push(this.listFilm_4[i]);
            }
        }

        for (let i = 0; i < list.length; i++) {
            if (list.length) {
                const film = {};
                film['img'] = list[i].img;
                film['country']  = list[i].country;
                film['imdb']  = list[i].imdb;
                film['time']  = list[i].time;
                film['name']  = list[i].name;
                film['actors']  = list[i].actors;
                film['producer']  = list[i].producer;
                film['year']  = list[i].year;
                film['kp']  = list[i].kp;
                film['director']  = list[i].director;
                film['genre']  = list[i].genre;
                film['url']  = list[i].url;
                film['id']  = list[i].id;
                film['watched']  = list[i].watched;
                film['rating']  = list[i].rating;
                film['description']  = list[i].description;
                this.user.films.push(new Film (film));
            }
        }
        console.log('this.user', this.user);

        if (this.userFormRegistration.valid) {
            this.userService.createUser(this.user).then(
                (userProfile) => {
                    console.log('Registration', userProfile);
                    this.router.navigate(['/']);
                }
            ).catch(
                (err) => {
                    console.log('No Registration', err);
                    this.onOpen();
                }
            );
        } else {
            console.log('userFormRegistration is Invalid');
        }
    }

}
