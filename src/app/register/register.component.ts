import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
      private formBuilder: FormBuilder, private authService: AuthService,
      private router: Router, private notifier: NotifierService) {
    let userId = localStorage.getItem('userId');
    if (userId) this.router.navigate(['']);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      job: ['', Validators.required],
      usage: ['', Validators.required]
    });
    this.registerForm.setValidators(this.repeatPasswordValidator());
  }

  repeatPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any}|null => {
      if (control.value.password === control.value.repeatPassword) return null;
      return {'repeat password': 'no match'};
    };
  }

  onSubmit() {
    // console.log(
    //   "TCL: LoginComponent -> login -> this.loginForm",
    //   this.loginForm
    // );
    this.authService.register(this.registerForm.getRawValue())
        .subscribe(
            user => {
              if (user.success == false) {
                this.notifier.notify(
                    'error',
                    '.اطلاعات وارد شده در فرم ثبت‌نام شما صحیح نمی باشند');
              }
              localStorage.setItem('userId', user.user.id);
              localStorage.setItem('userActive', user.user.isActive);
              this.notifier.notify(
                  'success',
                  '.شما با موفقیت ثبت‌نام کردید');
              setTimeout(() => {
                this.router.navigate(['']);
              }, 3000);
            },
            error => {
              console.log('TCL: onSubmit -> error', error.error.message);
              this.notifier.notify('error', error.error.message);
            });
  }
}
