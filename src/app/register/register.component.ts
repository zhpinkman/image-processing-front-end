import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    let userId = localStorage.getItem("userId");
    if (userId) this.router.navigate([""]);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      repeatPassword: ["", Validators.required],
      job: ["", Validators.required],
      usage: ["", Validators.required]
    });
    this.registerForm.setValidators(this.repeatPasswordValidator());
  }

  repeatPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value.password === control.value.repeatPassword) return null;
      return { "repeat password": "no match" };
    };
  }

  onSubmit() {
    // console.log(
    //   "TCL: LoginComponent -> login -> this.loginForm",
    //   this.loginForm
    // );
    this.authService.register(this.registerForm.getRawValue());
  }
}
