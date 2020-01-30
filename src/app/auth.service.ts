import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(user: { username: string; password: string }) {
    let username = user.username;
    let password = user.password;
    console.log("TCL: AuthService -> login -> user", user);
    this.http
      .post<any>("http://89.43.10.90:5000/users/login", { username, password })
      .subscribe(user => {
        console.log("TCL: AuthService -> login -> user", user);
        localStorage.setItem("userId", user.user.id);
        this.router.navigate([""]);
      });
  }

  register(user: {
    username: string;
    password: string;
    job: string;
    usage: string;
  }) {
    let username = user.username;
    let password = user.password;
    let job = "";
    let usage = "";
    console.log("TCL: user", user);
    this.http
      .post<any>("http://89.43.10.90:5000/users/register", {
        username,
        password,
        job,
        usage
      })
      .subscribe(user => {
        console.log("TCL: register -> user", user);
        console.log("user id", user.user.id);
        localStorage.setItem("userId", user.user.id);
        this.router.navigate([""]);
      });
  }
}
