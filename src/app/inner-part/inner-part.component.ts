import {coerceNumberProperty} from '@angular/cdk/coercion';
import {ReadVarExpr} from '@angular/compiler';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {element} from 'protractor';
import {Subject} from 'rxjs';

import {PicsService} from '../pics.service';
import {UploadService} from '../upload.service';

@Component({
  selector: 'app-inner-part',
  templateUrl: './inner-part.component.html',
  styleUrls: ['./inner-part.component.scss']
})
export class InnerPartComponent implements OnInit, OnDestroy {
  constructor(
      private notifier: NotifierService, private uploadService: UploadService,
      private picsService: PicsService) {
    console.log('zzz');
    if (!this.picsService.refreshPics.isStopped)
      this.picsService.refreshPics.subscribe(refresh => {
        console.log('TCL: InnerPartComponent ->', 'picsReloaded');
        this.reloadPics();
      });
    else {
      this.picsService.refreshPics = new Subject<any>();
      this.picsService.refreshPics.subscribe(refresh => {
        console.log('TCL: InnerPartComponent ->', 'picsReloaded');
        this.reloadPics();
      });
    }
  }

  @Input() uploadType: string;

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

  get tickInterval(): number|'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;

  ngOnInit() {
    let userId = localStorage.getItem('userId');
    this.picsService.getPics(userId).subscribe(pics => {
      if (!pics.success) {
        this.notifier.notify(
            'error',
            '.خطا در برقراری ارتباط برای گرفتن عکس‌های گذشته');
      }
      this.images = pics.pics;
      this.images = this.images.filter(element => {
        console.log(element.isFailed);
        return element.isFailed == false && element.isReady == true;
      });
      console.log(this.images);
    });
    // this.uploadedImageName = "slide3-l.jpg";
    // this.waitForResult();
  }

  uploadedImageName: string;
  mouse_on_image = false;
  images: any = [];
  file: any;
  // image_url: String|ArrayBuffer = '';
  correct_image_types = ['image/jpeg', 'image/png'];

  is_file_type_ok(event) {
    if (this.correct_image_types.includes(event.type)) return true;
    this.notifier.notify(
        'error',
        '.تایپ عکس آپلود‌شده پشتیبانی نمی‌شود');
    return false;
  }

  is_file_size_ok(event) {
    if (event.size < 5000000) return true;
    this.notifier.notify(
        'error',
        '.حجم عکس آپلود‌شده بیشتر از حجم مجاز ۵ مگابایت برای آپلود عکس می‌باشد');
    return false;
  }

  uploadFile(event) {
    if (event) {
      console.log('test');
      if (!this.is_file_type_ok(event) || !this.is_file_size_ok(event)) return;
      this.loading = true;
      var reader = new FileReader();

      reader.readAsDataURL(event);  // read file as data url

      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        // this.image_url = event.target.result;
        // document.getElementById('image_preview').
      };
      // this.notifier.notify("success", "Image uploaded successfully");
      console.log(event, this.uploadType);
      if (this.uploadType == 'ermia') {
        this.notifier.notify(
            'error', '.لطفا یکی از متد ها را قبل از آپلود عکس انتخاب کنید');
        this.loading = false;
        return;
      }
      this.uploadService.uploadFile(event, this.uploadType).subscribe(resp => {
        console.log(2);
        if (resp.success) {
          this.notifier.notify(
              'success',
              '.عکس با موفقیت آپلودشد. برای گرفتن نتیجه منتظر بمانید');
          this.uploadedImageName = event.name;
          this.waitForResult();
        } else if (!resp.success) {
          this.notifier.notify('error', '.آپلود عکس با خطا روبرو گردید');
        }
      });
    }
  }

  reloadPics() {
    console.log(1);
    let userId = localStorage.getItem('userId');
    this.picsService.getPics(userId).subscribe(pics => {
      this.images = pics.pics;
      this.images = this.images.filter(element => {
        return element.isFailed == false && element.isReady == true;
      });
      this.notifier.notify(
          'success',
          '.بارگیری مجدد عکس‌ها با موفقیت انجام شد');
    });
  }

  waitForResult() {
    let timeOut = setTimeout(() => {
      let userId = localStorage.getItem('userId');
      this.picsService.getPics(userId).subscribe(pics => {
        this.images = pics.pics;
        this.images = this.images.filter(element => {
          return element.isFailed == false && element.isReady == true;
        });
        if (this.images.some(pic => {
              return pic.originalName == this.uploadedImageName;
            })) {
          this.notifier.notify(
              'success', '.عکس آپلود شده با موفقیت پردازش گردید');
        } else {
          this.notifier.notify(
              'error',
              '.پردازش عکس آپلود‌شده با خطلا روبرو گردید');
        }
        this.uploadedImageName = '';
        this.loading = false;
      });
    }, 10000);
    // let timerId = setInterval(() => {
    //   let userId = localStorage.getItem("userId");
    //   this.picsService.getPics(userId).subscribe(pics => {
    //     if (
    //       pics.pics.some(pic => {
    //         return pic.originalName == this.uploadedImageName;
    //       })
    //     ) {
    //       clearInterval(timerId);

    //       this.images = pics.pics;
    //       let successfull = false;
    //       this.images = this.images.filter(element => {
    //         if (
    //           this.uploadedImageName == element.originalName &&
    //           element.isFailed == false
    //         ) {
    //           successfull = true;
    //         }
    //         return element.isFailed == false && element.isReady == true;
    //       });
    //       if (successfull) {
    //         this.notifier.notify(
    //           "success",
    //           "image successfully improved by the app"
    //         );
    //       } else {
    //         this.notifier.notify(
    //           "error",
    //           "image failed to be improved by the app"
    //         );
    //       }
    //       this.uploadedImageName = "";
    //       this.loading = false;
    //       clearTimeout(timeOut);
    //       return;
    //     }
    //   });
    // }, 20000);
  }

  ngOnDestroy() {
    console.log(';lkj');
    this.picsService.refreshPics.unsubscribe();
  }

  // downloadFile() {
  //   window.open(<string>this.image_url, '_blank');
  // }

  getType(type: string) {
    if (type == 'hdr') return 'HDR';
    if (type == 'coloring') return 'رنگ آمیزی';
    return 'HDR';
  }
  // deleteAttachment(index) {
  //   this.files.splice(index, 1);
  //   this.image_url = '';
  //   this.notifier.notify('success', 'Image removed successfully');
  // }

  mouse_enter() {
    this.mouse_on_image = true;
  }
  mouse_leave() {
    this.mouse_on_image = false;
  }

  openImage(image) {
    window.open(image.url.toString(), '_blank');
  }
}
