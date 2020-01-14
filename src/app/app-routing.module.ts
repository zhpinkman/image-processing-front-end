import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponentComponent } from "./main-component/main-component.component";
import { InnerPartComponent } from "./inner-part/inner-part.component";

const routes: Routes = [{ path: "**", component: InnerPartComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
