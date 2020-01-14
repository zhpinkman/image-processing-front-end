import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, OnDestroy } from "@angular/core";

@Component({
  selector: "app-main-component",
  templateUrl: "./main-component.component.html",
  styleUrls: ["./main-component.component.scss"]
})
export class MainComponentComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  fillerNav = [
    "خانه",
    "رنگی سازی",
    "بالا بردن وضوح",
    "HDR",
    "حذف زمینه",
    "تغییر زمینه",
    "حذف اشیا",
    "تغییر سبک"
  ];

  pageWidth: any;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.pageWidth = window.innerWidth;
  }

  fillerContent = [];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
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
}
