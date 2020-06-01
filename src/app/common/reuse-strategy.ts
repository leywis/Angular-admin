// 写一个类实现`RouteReuseStrategy`接口自定义路由复用策略
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from "@angular/router";

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  handlers: { [key: string]: DetachedRouteHandle } = {};
  activeRouteParentUrl: any = 0;

  // 是否在该页面使用路由复用，进入页面触发
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data.reload || false;
  }

  // 存储数据
  store(route: ActivatedRouteSnapshot, handle: {}): void {
    if (route.data.reload && this.getUrl(route)) {
      this.handlers[this.getUrl(route)] = handle;
    }
  }

  // 是否还原路由
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const routeUrl = this.getActiveUrl(this.getUrl(route))
    // 如果重新登录，则清空所有缓存路由数据
    if (this.getUrl(route).match("login")) {
      this.handlers = {};
    }
    
    if (this.activeRouteParentUrl!=routeUrl) {
      this.activeRouteParentUrl = this.getActiveUrl(this.getUrl(route));
      this.handlers = {};
    }
    return !!this.handlers[this.getUrl(route)];
  }

  // 获取存储中的路由信息
  retrieve(route: ActivatedRouteSnapshot): any {
    if (!this.getUrl(route)) {
      return null;
    }
    return this.handlers[this.getUrl(route)];
  }

  // 同一路由复用路由
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return (
      future.routeConfig === curr.routeConfig &&
      JSON.stringify(future.params) === JSON.stringify(curr.params)
    );
  }

  /** 获取url */
  getUrl(route: any) {
    return (
      route["_routerState"].url.replace(/\//g, "_") +
      "_" +
      (route.routeConfig.loadChildren ||
        route.routeConfig.component.toString().split("(")[0].split(" ")[1]) ||
      ""
    );
  }

  /** 获取活跃父路由的信息，切换菜单一旦改变，清空所有路由缓存信息 */
  getActiveUrl(url: any) {
    const urlItemList = url.split("_");
    let activeUrl = "";
    if (urlItemList.length > 3) {
      activeUrl = `${urlItemList[0]}_${urlItemList[1]}_${urlItemList[2]}_${urlItemList[3]}_${urlItemList[4]}`;
    }
    return activeUrl || "";
  }
}
