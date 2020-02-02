import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PicsService {
  baseUrl = "http://89.43.10.90:5000";

  constructor(private router: Router, private http: HttpClient) {}

  getPics(userId) {
    return this.http.post<any>(this.baseUrl + "/users/getpics", {
      userId
    });
  }
}
