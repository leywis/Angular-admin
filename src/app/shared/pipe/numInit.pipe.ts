import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numInit'
})
export class NumInitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let realValue
    if (typeof value == 'number' || typeof value == 'string') {
      if (args == 2) {
        realValue = Number(value)
        realValue = realValue.toFixed(2)
      } else {
        realValue = value
      }
    } else {
      realValue = '-'
    }
    return realValue
  }

}
