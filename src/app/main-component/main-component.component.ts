import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-main-component",
  templateUrl: "./main-component.component.html",
  styleUrls: ["./main-component.component.scss"]
})
export class MainComponentComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  fillerNav: { name: string; url: string }[] = [
    { name: "خانه", url: "" },
    { name: "رنگی سازی", url: "/colorize" },
    { name: "بالا بردن وضوح", url: "/improver" },
    { name: "HDR", url: "hdr" },
    { name: "حذف زمینه", url: "bgremover" },
    { name: "تغییر زمینه", url: "bgchanger" },
    { name: "حذف اشیا", url: "thingsremover" },
    { name: "تغییر سبک", url: "stylechanger" }
  ];

  pageWidth: any;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.pageWidth = window.innerWidth;
  }

  fillerContent = [];

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.pageWidth = window.innerWidth;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.pageWidth = window.innerWidth;
  }

  logout() {
    localStorage.removeItem("userId");
    this.router.navigate(["login"]);
  }
}
