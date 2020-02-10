import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Subject, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PicsService {
  baseUrl = "http://api.negar.avir.co.com";

  refreshPics = new Subject<any>();
  // refreshPics = new ReplaySubject<any>(0);

  constructor(private router: Router, private http: HttpClient) {}

  getPics(userId) {
    console.log(userId);
    return this.http.post<any>(this.baseUrl + "/users/getpics", {
      userId
    });
  }
}
