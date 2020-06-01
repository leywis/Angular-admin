import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesComponent } from "./pages.component";
import { PagesRoutes } from "./pages.routing";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [CommonModule, PagesRoutes, SharedModule],
  declarations: [PagesComponent],
})
export class PagesModule {}
