import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let userId = localStorage.getItem("userId");
    let userActive = localStorage.getItem("userActive");
    console.log( (userId && userActive)== "true" );

    if ((userId && userActive) == "true"){
      console.log('ermi13123a');

       return true
    }else if(userActive == "false"){

      this.router.navigate(["/activate"]);
      return false;
    }else {
      console.log("login");
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
