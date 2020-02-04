import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { PicsService } from "../pics.service";

@Component({
  selector: "app-improver",
  templateUrl: "./improver.component.html",
  styleUrls: ["./improver.component.scss"]
})
export class ImproverComponent implements OnInit, OnDestroy {
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

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private picsService: PicsService
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
  refresh() {
    this.picsService.refreshPics.next(true);
  }
}
