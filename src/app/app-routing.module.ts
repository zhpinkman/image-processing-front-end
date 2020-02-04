import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponentComponent } from "./main-component/main-component.component";
import { InnerPartComponent } from "./inner-part/inner-part.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ActivateComponent } from "./activate/activate.component";
import { AanComponent } from "./aan/aan.component";
import { HdrComponent } from "./hdr/hdr.component";
import { ColorizeComponent } from "./colorize/colorize.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "activate", component: ActivateComponent },
  { path: "aan", component: AanComponent },
  { path: "hdr", component: HdrComponent, canActivate: [AuthGuard] },
  { path: "colorize", component: ColorizeComponent, canActivate: [AuthGuard] },
  { path: "**", component: MainComponentComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
