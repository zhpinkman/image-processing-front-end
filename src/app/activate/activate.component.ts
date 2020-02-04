import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  values = '';
  getAgain = false;
  timer = 10;
  baseUrl = "http://api.negar.avir.co.com";
  error = "";
  message = '';
  constructor(private router: Router, private http: HttpClient, private notifier: NotifierService) {}

  ngOnInit() {

  }

  submitCode(){
      // console.log('er,oa123123');
      let userId = localStorage.getItem("userId");
      return this.http.post<any>(this.baseUrl + "/users/activate", {
        code:this.values,
        userId
      });
  }

  newCode(){
      // console.log('er,oa123123');
      let userId = localStorage.getItem("userId");
      return this.http.post<any>(this.baseUrl + "/v2/users/sendcode", {
        userId
      });
  }

  startCountDown(){
    let main = this;
    var x = setInterval(function() {
      main.timer = main.timer - 1;
      if (main.timer < 1) {
        clearInterval(x);
        main.getAgain = true;
      }
    }, 1000);
  }
  onKey(event: any) { // without type info
    this.values = event.target.value ;
    if(this.values.length == 4){
      this.submitCode().subscribe(res =>{
        // this.startCountDown();

        if (res.success == false) {
          console.log(res.success == false);
          this.startCountDown();
          this.message = "کد شما نا درست است!";
          this.notifier.notify(
            "error",
            "کد شما نا درست است!"
          );
        }else{
          localStorage.setItem("userActive", "true");
          this.router.navigate(["/hdr"]);
        }
      },
      error => {
        console.log("TCL: onSubmit -> error", error.error.message);
        this.notifier.notify("error", error.error.message);
        this.startCountDown();
      });


    }
  }

  onSubmit(){
    console.log(this.values);
    this.getAgain = true
  }

  getCode(){
    console.log('ermia');
    this.newCode().subscribe(res =>{
      if(res.success){
        this.message = "کد برای شما مجددا ارسال شد";
        this.getAgain = false;
        this.notifier.notify("success", "کد برای شما مجددا ارسال شد");
      }
    })
  }


    logout() {
      localStorage.removeItem("userId");
      this.router.navigate(["login"]);
    }
}
