import { Component, OnInit } from "@angular/core";
import { NotifierService } from "angular-notifier";

@Component({
  selector: "app-inner-part",
  templateUrl: "./inner-part.component.html",
  styleUrls: ["./inner-part.component.scss"]
})
export class InnerPartComponent implements OnInit {
  constructor(private notifier: NotifierService) {}

  ngOnInit() {}

  files: any = [];
  image_url: String | ArrayBuffer = "";

  uploadFile(event) {
    if (event) {
      console.log("TCL: InnerPartComponent -> uploadFile -> event", event);
      this.files.push(event.name);
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
  deleteAttachment(index) {
    this.files.splice(index, 1);
    this.image_url = "";
    this.notifier.notify("success", "Image removed successfully");
  }
}
