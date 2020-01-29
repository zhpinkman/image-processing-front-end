import { Component, OnInit } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { ReadVarExpr } from "@angular/compiler";
import { coerceNumberProperty } from "@angular/cdk/coercion";

@Component({
  selector: "app-inner-part",
  templateUrl: "./inner-part.component.html",
  styleUrls: ["./inner-part.component.scss"]
})
export class InnerPartComponent implements OnInit {
  constructor(private notifier: NotifierService) {}

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

  ngOnInit() {}

  mouse_on_image = false;
  files: any = [];
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
