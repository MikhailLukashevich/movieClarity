import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    userForm: FormGroup;
    userFormRegistration: FormGroup;
    subscrValueChange: Subscription;
    message: string = null;
    formEnable: boolean = true;
    FieldInValid: boolean;
    isEnter: boolean = true;
    isRegistration: boolean;
    error: String;

    formErrors = {
        'email': '',
        'password': ''
    };

    validationMessages = {
        'email': {
            'required': 'Укажите Ваш логин.',
            // 'pattern': 'Please enter valid e-mail.'
        },
        'password': {
            'required': 'Укажите Ваш пароль.'
        }
    };

    constructor(private fb: FormBuilder,
                private router: Router,
                private user: UserService,) { }

    ngOnInit() {
        this.createForm();
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
                    Validators.required,
                    Validators.pattern('[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')
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
            this.user.login(username, password).subscribe(
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
                  }
        
                },
                (error) => {
                  console.log(error);
                  // place error handling here
                }
              );this.router.navigate(['/']);

        } else {
            this.validateAllFormFields(this.userForm);
        }
    }

    onRegistration() {
        console.log("onRegistration");
        this.FieldInValid = true;
        this.onValueChange();
        if (this.userFormRegistration.valid) {
            this.router.navigate(['/']);

        } else {
            this.validateAllFormFields(this.userFormRegistration);
        }
    }

    onTemplateEnter() {
        this.isEnter = true;
        this.isRegistration = false;
    }

    onTemplateRegistration() {
        this.isRegistration = true;
        this.isEnter = false; 
    }

}
