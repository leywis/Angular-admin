import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  RouterOutlet,
} from "@angular/router";
import { NzModalService, NzMessageService } from "ng-zorro-antd";
import {
  passwordFormat,
  passwordValidator,
} from "../shared/validator/validator";
import { Md5 } from "ts-md5";

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.css"],
})
export class PagesComponent implements OnInit {
  isCollapsed: boolean;
  showBackBtn: boolean;
  activeUrl: string; // 当前活跃的url，用于记录展开一级菜单

  userInfo; // 本地永华信息
  data: any; //菜单数据
  mainId: number;
  mainMenuList: any[] = []; // 一级菜单
  // 修改密码
  resetPwdForm: FormGroup;
  isResetPwdShow: boolean = false;
  isConfirmLoading: boolean;
  passwordDiff: boolean = false;
  validateStatus: any;
  // 帮助中心
  goodsList: any[] = [];
  carriageList: any[] = [];
  pickupList: any[] = [];
  receiveList: any[] = [];

  constructor(
    private routerInfo: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private info: NzModalService,
    private message: NzMessageService
  ) {
    this.isCollapsed = false;
    // 默认不展示返回按钮
    this.showBackBtn = false;

    // 监听路由，如果路由层级大于两级（此处截取首位有空字符，以3计算），显示返回按钮
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeUrl = event.url;
        const urlArr = event.url.split("/");
        this.showBackBtn = urlArr.length > 5;
      }
    });

    // 修改密码
    this.resetPwdForm = this.fb.group({
      oldPwd: ["", [Validators.required, passwordFormat]],
      passwordInfo: this.fb.group(
        {
          newPwd: ["", [Validators.required, passwordFormat]],
          newConfirmPwd: [""],
        },
        { validator: passwordValidator }
      ),
    });
  }

  get passwordInfo() {
    return this.resetPwdForm.get("passwordInfo");
  }

  ngOnInit() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  }

  backHistory() {
    history.back();
  }

  // 路由过度
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }

  /**
   * @desc 退出登录
   */
  loginOut() {
    sessionStorage.removeItem("userInfo");
    this.router.navigate(["/login"]);
  }

  // 修改密码接口
  changePwd() {
    let params = {
      oldPwd: Md5.hashStr(this.resetPwdForm.value.oldPwd),
      newPwd: Md5.hashStr(this.resetPwdForm.value.passwordInfo.newPwd),
    };

    this.message.info("密码修改成功");
  }

  // 修改密码
  resetPassword() {
    this.isResetPwdShow = true;
  }

  // 修改密码隐藏弹窗
  handleCancel() {
    this.isResetPwdShow = false;
    this.resetPwdForm.reset();
  }

  // 确认密码
  confirmChange() {
    this.passwordDiff = this.passwordInfo.hasError("passwordDiff");
    this.validateStatus = this.passwordDiff ? "error" : "success";
  }
}
