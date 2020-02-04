import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  baseUrl = "http://api.negar.avir.co.com";

  login(user: { username: string; password: string }) {
    let username = user.username;
    let password = user.password;
    console.log("TCL: AuthService -> login -> user", user);
    return this.http.post<any>(this.baseUrl + "/users/login", {
      username,
      password
    });
  }

  register(user: {
    username: string;
    password: string;
    job: string;
    usage: string;
  }) {
    let phonenumber = user.username;
    let password = user.password;
    let job = "";
    let usage = "";
    console.log("TCL: user", user);
    return this.http.post<any>(this.baseUrl + "/v2/users/register", {
      phonenumber,
      password,
      job,
      usage
    });
  }
}
