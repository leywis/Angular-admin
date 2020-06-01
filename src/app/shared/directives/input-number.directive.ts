/**
 * @desc 该指令用于帮助表单限制只输入数字或者保留两位小数
 * liuya
 */

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputNumber]'
})
export class InputNumberDirective {
  /** 可以保留的小数位数 目前只支持保留两位 */
  @Input('appInputNumber') keepNum: number
  /** 监听表单keyup事件 */
  @HostListener('keyup') onKeyup() {
    this.inputValueVaild()
  }

  constructor(private ele: ElementRef) { }

  /**
   * @desc value正则验证
   */
  private inputValueVaild() {
    const reg = /[^\d]/g   // 输入纯数字
    const keep = this.keepNum || 0;  // 保留位数

    const regForKeep = /^(\-)*(\d+)\.(\d\d).*$/
    if (keep < 1) {
      // 只能输入正整数
      this.ele.nativeElement.value = this.ele.nativeElement.value.replace(reg, '')
    } else {
      const obj = this.ele.nativeElement
      obj.value = obj.value.replace(/[^\d.]/g, '');  // 清除“数字”和“.”以外的字符
      obj.value = obj.value.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
      // 保留小数
      obj.value = obj.value.indexOf('.') > -1 ? obj.value.replace(regForKeep, '$1$2.$3') : obj.value
      // 触发input事件
      const event = new Event('input')
      obj.dispatchEvent(event);
    }
  }
}
