import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    userForm: FormGroup;
    subscrValueChange: Subscription;
    message: string = null;
    formEnable: boolean = true;
    FieldInValid: boolean;

    formErrors = {
        'email': '',
        'password': ''
    };

    validationMessages = {
        'email': {
            'required': 'Please specify your login.',
            'pattern': 'Please enter valid e-mail.'
        },
        'password': {
            'required': 'Please specify your password.'
        }
    };

    constructor(private fb: FormBuilder,
                private router: Router) { }

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
                    Validators.pattern('[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')
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
        if (this.userForm.valid) {
            this.router.navigate(['/']);

        } else {
            this.validateAllFormFields(this.userForm);
        }
    }

}
