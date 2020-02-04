import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  constructor(private router: Router, private http: HttpClient) {}

  baseUrl = "http://api.negar.avir.co.com";

  uploadFile(file: File, uploadType: string) {
    let userId = localStorage.getItem("userId");
    let formData = new FormData();
    formData.append("userId", userId);
    if (uploadType == "hdr") {
      formData.append("improver", file);
      formData.append("type", uploadType);

      return this.http.post<any>(
        this.baseUrl + "/users/uploadForImprove",
        formData
        // headers: { "content-type": "multipart/formd-ata" }
      );
    }
    if (uploadType == "coloring") {
      formData.append("color", file);
      formData.append("type", uploadType);
      return this.http.post<any>(
        this.baseUrl + "/users/uploadForColor",
        formData
        // headers: { "content-type": "multipart/formd-ata" }
      );
    }
  }
}
