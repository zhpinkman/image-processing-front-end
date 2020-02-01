import { Component, OnInit } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { ReadVarExpr } from "@angular/compiler";
import { coerceNumberProperty } from "@angular/cdk/coercion";
import { UploadService } from "../upload.service";
import { PicsService } from "../pics.service";
import { element } from "protractor";
import { Router } from "@angular/router";

@Component({
  selector: "app-inner-part",
  templateUrl: "./inner-part.component.html",
  styleUrls: ["./inner-part.component.scss"]
})
export class InnerPartComponent implements OnInit {
  constructor(
    private notifier: NotifierService,
    private uploadService: UploadService,
    private picsService: PicsService
  ) {}

  loading = false;
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  options = new Array<number>(10);
  vertical = false;

  get tickInterval(): number | "auto" {
    return this.showTicks ? (this.autoTicks ? "auto" : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;

  ngOnInit() {
    let userId = localStorage.getItem("userId");
    this.picsService.getPics(userId).subscribe(pics => {
      if (!pics.success) {
        this.notifier.notify(
          "error",
          "something went wrong getting the previous pics"
        );
      }
      this.images = pics.pics;
      this.images = this.images.filter(element => {
        console.log(element.isFailed);
        return element.isFailed == false;
      });
      console.log(
        "TCL: InnerPartComponent -> ngOnInit -> this.images",
        this.images
      );
    });
    // this.uploadedImageName = "slide3-l.jpg";
    // this.waitForResult();
  }

  uploadedImageName: string;
  mouse_on_image = false;
  images: any = [];
  file: any;
  image_url: String | ArrayBuffer = "";
  correct_image_types = ["image/jpeg", "image/png"];

  is_file_type_ok(event) {
    if (this.correct_image_types.includes(event.type)) return true;
    this.notifier.notify(
      "error",
      "file type is not supported, you can only upload images with "
    );
    return false;
  }

  is_file_size_ok(event) {
    if (event.size < 5000000) return true;
    this.notifier.notify(
      "error",
      "file size is greater than the allowable file size ( 5 MB )"
    );
  }

  uploadFile(event) {
    if (event) {
      if (!this.is_file_type_ok(event) || !this.is_file_size_ok(event)) return;
      this.loading = true;
      var reader = new FileReader();

      reader.readAsDataURL(event); // read file as data url

      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.image_url = event.target.result;
        // document.getElementById('image_preview').
      };
      // this.notifier.notify("success", "Image uploaded successfully");
      console.log("TCL: InnerPartComponent -> uploadFile -> event", event);
      this.uploadService.uploadFile(event).subscribe(resp => {
        if (resp.success)
          this.notifier.notify(
            "success",
            "image uploaded successfully waiting for the result"
          );
      });
      this.uploadedImageName = event.name;
      this.waitForResult();
    }
  }

  waitForResult() {
    console.log(
      "TCL: InnerPartComponent -> waitForResult -> ",
      "start waiting for the pic to be uploaded"
    );
    let timeOut = setTimeout(() => {
      clearInterval(timerId);
      this.uploadedImageName = "";
      this.notifier.notify(
        "error",
        "some thing went wrong with uploading the image"
      );
      this.loading = false;
      console.log(
        "TCL: InnerPartComponent -> waitForResult -> ",
        "timer stopped"
      );
    }, 10000);
    let timerId = setInterval(() => {
      let userId = localStorage.getItem("userId");
      this.picsService.getPics(userId).subscribe(pics => {
        if (
          pics.pics.some(pic => {
            console.log(
              "TCL: InnerPartComponent -> timerId -> pic",
              pic.originalName,
              this.uploadedImageName
            );
            return pic.originalName == this.uploadedImageName;
          })
        ) {
          clearInterval(timerId);

          // console.log(
          //   "TCL: InnerPartComponent -> timerId -> ",
          //   "time stopped by request success"
          // );
          this.images = pics.pics;
          let successfull = false;
          this.images = this.images.filter(element => {
            // console.log(
            //   "TCL: InnerPartComponent -> timerId -> element",
            //   element
            // );
            if (
              this.uploadedImageName == element.originalName &&
              element.isFailed == false
            ) {
              successfull = true;
            }
            return element.isFailed == false;
          });
          if (successfull) {
            this.notifier.notify(
              "success",
              "image successfully improved by the app"
            );
          } else {
            this.notifier.notify(
              "error",
              "image failed to be improved by the app"
            );
          }
          this.uploadedImageName = "";
          this.loading = false;
          clearTimeout(timeOut);
          return;
        }
      });
      console.log("TCL: InnerPartComponent -> timerId -> ", "timer is working");
    }, 2000);
  }

  downloadFile() {
    console.log(
      "TCL: InnerPartComponent -> downloadFile -> this.image_url",
      this.image_url
    );
    window.open(<string>this.image_url, "_blank");
  }

  // deleteAttachment(index) {
  //   this.files.splice(index, 1);
  //   this.image_url = "";
  //   this.notifier.notify("success", "Image removed successfully");
  // }

  mouse_enter() {
    this.mouse_on_image = true;
  }
  mouse_leave() {
    this.mouse_on_image = false;
  }

  openImage(image) {
    window.open(image.url.toString(), "_blank");
  }
}
