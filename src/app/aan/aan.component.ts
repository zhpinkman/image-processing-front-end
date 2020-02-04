import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-aan',
  templateUrl: './aan.component.html',
  styleUrls: ['./aan.component.scss']
})
export class AanComponent implements OnInit {
  baseUrl = "http://api.negar.avir.co.com";

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient,    private router: Router
) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
    console.log(params);
    if(params.payload){
      if( params.payload != "HY3JCLWUGGNQUnGYR1JgT4YThq2p1UYeLWw44DhbO7Q1h.bxobVc2iyfTLW4rMaez2eIDE6NzaYtv.E20Hn7uI2Jk..0etglVeO.WNeRx6qFhGoIca5mRkDxtTGoYk7XwmXMzkyNSCfwItNKWZpuSWhIiIonHfr14tMObKZXYtA-")
        this.router.navigate(["login"]);
      this.getUser(params.payload);
    }
  });
   }

  ngOnInit() {
  }

  callGetUser(payload: String){
    return this.http.post<any>(this.baseUrl + "/users/getaanuser", {
      payload
    });
  }
  getUser(payload: String){
    this.callGetUser(payload).subscribe(res =>{
      if(res.success){
        localStorage.setItem("userId", res.userId);
        localStorage.setItem("userActive", "true");
      }
    })
  }
}
