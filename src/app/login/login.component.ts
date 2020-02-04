import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { timeout } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notifier: NotifierService
  ) {
    let userId = localStorage.getItem("userId");
    if (userId) this.router.navigate([""]);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.loginForm.updateValueAndValidity();
  }

  onSubmit() {
    this.authService.login(this.loginForm.getRawValue()).subscribe(user => {
      console.log("TCL: AuthService -> login -> user", user);
      if (user.success == false) {
        this.notifier.notify("error", "your username or password is wrong");
        return;
      }
      localStorage.setItem("userId", user.user.userId);
      localStorage.setItem("userActive", user.user.isActive);
      this.notifier.notify("success", "you have been successfully loged in");
      setTimeout(() => {
        this.router.navigate([""]);
      }, 3000);
    });
  }
}
