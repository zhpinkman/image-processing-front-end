import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  constructor(private router: Router, private http: HttpClient) {}

  uploadFile(file: File) {
    let userId = localStorage.getItem("userId");
    let formData = new FormData();
    formData.append("improver", file);
    formData.append("userId", userId);
    formData.append("type", "improver");

    return this.http.post<any>(
      "http://89.43.10.90:5000/users/uploadForImprove",
      formData
      // headers: { "content-type": "multipart/formd-ata" }
    );
  }
}
