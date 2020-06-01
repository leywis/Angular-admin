/**
 * *******************************************************************************************
 * @App: test
 * @author: xwx
 * @type: service
 * @src: services/request.service.ts
 *
 * @descriptions:
 * 请求的服务
 *
 * *******************************************************************************************
 */
// Angular Core
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// rxjs
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class RequestService {
  private setTimeout = 3000;  // 默认的超时时间

  constructor(private http: HttpClient) {
  }

  /** 添加Authorization的属性 */
  private addAuthorization(options: any): void {
    options.headers = {
      // userId: '',
      // childId: ''
      'Authorization': '1drf5dg4d7s4w7z',
    };
  }

  /** 获取数据
   * param:  url    string      必填,请求的url
   *         time   number      可不填,请求的超时时间,如不填,默认为setTimeout
   * return:        Observable  HttpClient的get请求，请求完成后返回的值类型是any
   */
  // public getData(url, time = this.setTimeout): Observable<any> {
  //   const thiUrl = url;  // 用到的url
  //   const options = {};  // 请求的设置
  //   const thisTime = time;  // 用到的超时时间
  //   this.addAuthorization(options);  // 请求头里添加Authorization参数
  //   return this.http.get(thiUrl, options)
  //     .timeout(thisTime)
  //     .catch(this.httpErrorFun)  // 处理错误信息(必须放在timeout和map之间)
  //     .map(res => this.resFun(res));
  // }

  /** 返回数据的处理
   *  param:    data     any     必填,需要处理的数据
   *  return:   res      any     返回处理后的值
   */
  private resFun(data: any): any {
    const thisData: any = data;  // 需要处理的值
    let res: any;  // 最终值

    // 当status为200时
    if (thisData.status == 200) {
      res = thisData.data; // 给最终值赋值
    } else {
      // 当status不为200时
      const err = thisData.msg;  // 错误信息
      throw new Error(err);  // 抛出错误
    }
    return res;  // 返回最终值
  }

  /**
   * @param err
   * 对请求错误信息的处理
   *  param:    err                 any                 必填,需要处理的错误信息
   *  return:   Observable.throw    Observable<string>  string:处理后显示的错误文字
   */
  public httpErrorFun(err: any): Observable<string> {
    let res = '';  // 处理后的结果
    const data: any = err;  // 需要处理的值

    /** 后台有返回错误信息时 */
    if (data.hasOwnProperty('error') && data.hasOwnProperty('message')) {
      res = data.message;

      /** 后台没有返回错误信息只有错误名时 */
    } else if (data.hasOwnProperty('name')) {
      const errName = data.name;

      /** 请求超时 */
      if (errName == 'TimeoutError') {
        res = '对不起，请求超时了';
      }

      /** 后台返回未授权时 */
    } else if (data == 'Unauthorization') {
      res = '您没有权限，请重新登录';
    } else {
      res = '哎呀，不知道是啥错误~~';
    }

    return Observable.throw(res);
  }

}