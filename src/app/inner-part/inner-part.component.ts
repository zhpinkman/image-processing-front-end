import { Component, OnInit } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { ReadVarExpr } from "@angular/compiler";

@Component({
  selector: "app-inner-part",
  templateUrl: "./inner-part.component.html",
  styleUrls: ["./inner-part.component.scss"]
})
export class InnerPartComponent implements OnInit {
  constructor(private notifier: NotifierService) {}

  ngOnInit() {}

  mouse_on_image = false;
  files: any = [];
  image_url: String | ArrayBuffer = "";
  correct_image_types = ["image/jepg", "image/png"];

  is_file_type_ok(event) {
    if (this.correct_image_types.includes(event.type)) return true;
    this.notifier.notify(
      "error",
      "file type is not supported, you can only upload images with "
    );
    return false;
  }

  uploadFile(event) {
    if (event) {
      if (!this.is_file_type_ok(event)) return;
      console.log("TCL: InnerPartComponent -> uploadFile -> event", event);
      this.files.push(event);
      var reader = new FileReader();

      reader.readAsDataURL(event); // read file as data url

      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.image_url = event.target.result;
        // document.getElementById('image_preview').
      };
      this.notifier.notify("success", "Image uploaded successfully");
    }
  }

  downloadFile() {
    console.log(
      "TCL: InnerPartComponent -> downloadFile -> this.image_url",
      this.image_url
    );
    window.open(<string>this.image_url, "_blank");
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
    this.image_url = "";
    this.notifier.notify("success", "Image removed successfully");
  }

  mouse_enter() {
    this.mouse_on_image = true;
  }
  mouse_leave() {
    this.mouse_on_image = false;
  }
}
