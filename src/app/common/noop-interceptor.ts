/**
 * @desc http请求拦截器：统一头部和错误处理
 * liuya
 */

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { timeout, delay, retryWhen, scan, tap, catchError, debounceTime, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';


/** 超时时间 */
const DEFAULTTIMEOUT = 5000;

/** 最大重试次数 */
const MAXRETRYCOUNT = 3;

/** 防止重复点击 网络重复请求 */
const MAXDEBOUNCETIME = 1000;

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private notification: NzNotificationService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        // 头部信息设置
        // TODO: 后期需要根据具体需要动态改动
        const USERRINFO = JSON.parse(sessionStorage.getItem('userInfo'))

        // 平台  PLATFORM(1, "plat")
        // 承运  TRANS(2, "trans")
        // 货主  OWNER(4, "owner")
        let userTypeFromUrl   // 根据路由判断端的类型
        const typeByUrl = this.router.url.split('/')[1]
        switch (typeByUrl) {
            case 'platform':
                userTypeFromUrl = 'plat'
                break;
            case 'owner':
                userTypeFromUrl = 'owner'
                break;
            case 'carriage':
                userTypeFromUrl = 'trans'
                break;
            default:
                userTypeFromUrl = null
                break;
        }

        const setHeadersParams = USERRINFO ? {
            userId: (USERRINFO.userId).toString(),
            accessToken: USERRINFO.accessToken,
            userType: userTypeFromUrl,
        } : {
                userId: '3',
                accessToken: 'token',
                userType: 'transport',
            }

        const authReq = req.clone({
            setHeaders: setHeadersParams
        });
        return next.handle(authReq).pipe(
            // 请求防抖
            debounceTime(MAXDEBOUNCETIME),
            // 请求超时
            timeout(DEFAULTTIMEOUT),
            // 失败重试
            retryWhen(err$ => {
                // 重试
                return err$.pipe(
                    scan((errCount, err) => {
                        if (errCount >= MAXRETRYCOUNT) {
                            throw err;
                        }
                        return errCount + 1;
                    }, 0),
                    delay(1000),
                    tap(errCount => {
                        // 副作用
                        if (errCount === 1) {
                            // 第一次重试时，提示用户
                            this.noticeWarn('网络超时,正在重新请求中...');
                        }
                    })
                );
            }),
            // 抛出异常
            catchError((err: HttpErrorResponse) => {
                this.noticeError('网络超时, 请重试');
                return throwError('网络超时' + err.name + err.message);
            }),
            // 响应部分的拦截处理
            tap(
                response => {
                    if (response instanceof HttpResponse) {
                        if (response.status === 200 && response.body.hasOwnProperty('code') && parseInt(response.body.code, 10) != 0) {
                            const message = response.body.msg || '未知错误';
                            if (parseInt(response.body.code, 10) === 100) {
                                // 登录相关信息失效
                                this.router.navigate(['/login']);
                            }
                            this.noticeWarn(message);
                        }
                    }
                },
                error => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.status >= 500) {
                            this.noticeError(`服务器内部错误 ${error.status}`);
                        } else if (error.status >= 400 && error.status < 500) {
                            this.noticeError(`客户端参数错误 ${error.status}`);
                        }
                    }
                }
            )
        );
    }

    // error提示
    noticeError(msg: string): void {
        this.notification.error('服务出错', msg);
    }

    // 注意提醒
    noticeWarn(msg: string): void {
        this.notification.error('提示', msg);
    }
}
