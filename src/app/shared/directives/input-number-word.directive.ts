/**
 * @desc 该指令用于帮助表单限制：只能输入数字和字母及长度限制
 */

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputNumberWord]'
})
export class InputNumberWordDirective {
  /** 限制最大输入数量 */
  @Input('appInputNumberWord') maxNum: number
  /** 监听表单keyup事件 */
  @HostListener('keyup') onKeyup() {
    this.inputValueVaild()
  }

  constructor(private ele: ElementRef) { }

  /**
   * @desc value正则验证
   */
  private inputValueVaild() {
    const obj = this.ele.nativeElement
    obj.value = this.ele.nativeElement.value.replace(/[^\w]/g,'')
    if (this.maxNum && obj.value.length > this.maxNum) {
      obj.value = obj.value.slice(0, this.maxNum)
    }
    const event = new Event('input')
    obj.dispatchEvent(event);
  }

}
