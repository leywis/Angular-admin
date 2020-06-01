import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedComponent } from "./shared.component";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { InputNumberDirective } from "./directives/input-number.directive";
import { NumInitPipe } from "./pipe/numInit.pipe";
import { NoSpaceDirective } from "./directives/no-space.directive";
import { InputNumberWordDirective } from "./directives/input-number-word.directive";
import { InputNumberStrDirective } from "./directives/input-number-str.directive";

@NgModule({
  imports: [CommonModule, NgZorroAntdModule, FormsModule, ReactiveFormsModule],
  exports: [
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberDirective,
    InputNumberWordDirective,
    InputNumberStrDirective,
    NoSpaceDirective,
    NumInitPipe,
  ],
  declarations: [
    SharedComponent,
    InputNumberDirective,
    InputNumberWordDirective,
    InputNumberStrDirective,
    NoSpaceDirective,
    NumInitPipe,
  ],
})
export class SharedModule {}
