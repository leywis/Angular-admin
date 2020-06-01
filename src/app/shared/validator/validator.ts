import { FormControl, FormGroup } from "@angular/forms";

// 手机验证
export function phoneValidator(phone: FormControl): any {
  let value = phone.value + "";
  let reg = /^[1][0-9]{10}$/;

  if (value == "") return;

  let valid = reg.test(value);
  return valid ? null : { phone: true };
}

// 密码是否相同验证
export function passwordValidator(info: FormGroup): any {
  let password: FormControl = info.get("newPwd") as FormControl;
  let pConfirm: FormControl = info.get("newConfirmPwd") as FormControl;
  let valid: boolean = password.value === pConfirm.value;

  return valid ? null : { passwordDiff: true };
}

// 密码格式是否正确验证
export function passwordFormat(password: FormControl): any {
  let value = password.value + "";
  let reg = /^(\w){6,12}$/;

  if (value == "") return;

  let valid = reg.test(value);
  return valid ? null : { passwordFormat: true };
}

// 姓名验证
export function nameValidator(name: FormControl): any {
  let value = name.value + "";
  let reg = /^[\u4e00-\u9fa5]{2,4}$/;

  if (value == "") return;

  let valid = reg.test(value);
  return valid ? null : { name: true };
}

// 身份证号验证
export function idValidator(id: FormControl): any {
  let value = id.value + "";
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

  if (value == "") return;

  let valid = reg.test(value);
  return valid ? null : { id: true };
}

// 最多输入40个汉字
export function companyValidator(company: FormControl): any {
  let value = company.value + "";
  let reg = /^[\u4e00-\u9fa5]{1,40}$/;

  if (value == "") return;

  let valid = reg.test(value);
  return valid ? null : { maxlength: true };
}
