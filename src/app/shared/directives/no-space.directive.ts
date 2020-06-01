import { Directive, ElementRef, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";
import { keyframes } from "@angular/animations";

@Directive({
  selector: "[appNoSpace]",
})
export class NoSpaceDirective {
  /** 监听表单keyup事件 */
  @HostListener("keyup", ["$event"]) onKeyup($event) {
    this.inputValueVaild($event);
  }

  constructor(private ele: ElementRef) {}

  /**
   * @desc value正则验证
   */
  private inputValueVaild(e) {
    const obj = this.ele.nativeElement;
    if (e.keyCode == 32) {
      obj.value = obj.value + " ";
    }
    if (obj.value.indexOf("  ") > -1) {
      obj.value = obj.value.replace(/\s+/g, "");
    }
    obj.value = obj.value.trim();
    // 触发input事件
    const event = new Event("input");
    obj.dispatchEvent(event);
  }
}
