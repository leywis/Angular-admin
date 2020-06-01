import { HttpClient } from "@angular/common/http";
import { RouterModule, Router, ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login.service";
import { Md5 } from "ts-md5/dist/md5";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // 表单模型

  tabIndex: number; // tab切换  平台登录1  企业登录2

  captchaImgUrl: string; // 验证码

  isLogining: boolean; // 登录加载提示

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private service: LoginService
  ) {
    this.tabIndex = 2;

    this.loginForm = this.fb.group({
      type: [2, Validators.required],
      mobile: ["", [Validators.required, Validators.minLength(11)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      captcha: ["", Validators.required],
    });
  }

  ngOnInit() {}

  get mobile() {
    return this.loginForm.get("mobile") as any;
  }

  get password() {
    return this.loginForm.get("password") as any;
  }

  get captcha() {
    return this.loginForm.get("captcha") as any;
  }

  /**
   * @desc 登录
   */
  loginSubmit() {
    // 手动触发验证
    for (const i in this.loginForm.controls) {
      if (this.loginForm.controls.hasOwnProperty(i)) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }
    if (!this.loginForm.valid) {
      return;
    }
    const params = {
      captcha: this.captcha.value,
      mobile: +this.mobile.value,
      pwd: Md5.hashStr(this.password.value), // md5加密
      platUserType: 1, // 系统用户类型：1.系统平台方 2承运方 3司机 4货主 ,
    };
    // 判断平台类型
    params.platUserType =
      this.tabIndex == 2 ? this.loginForm.value.type : this.tabIndex;

    // 移除旧的登录信息
    sessionStorage.removeItem("userInfo");
    if (params.platUserType === 1) {
      // 登录平台端
      this.router.navigate(["/pages"]);
    } else if (params.platUserType === 2) {
      // 登录承运端
      this.router.navigate(["/pages"]);
    } else if (params.platUserType === 4) {
      // 登录货主端
      this.router.navigate(["/pages"]);
    }
  }

  /**
   * @desc 获取图片验证码
   */
  // getCaptchaImg() {
  //   this.captchaImgUrl = this.service.getCaptchaImg(this.loginForm.value.mobile)
  // }

  /**
   * @desc 输入完成手机号后首次获取验证码
   */
  // getMobile() {
  //   if (this.mobile.value.length == 11) {
  //     this.loginForm.get('captcha').reset()
  //     this.getCaptchaImg()
  //   }
  // }
}
