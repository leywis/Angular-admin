import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { httpInterceptorProviders } from './common/interceptor-index';

import zh from '@angular/common/locales/zh';
import { RouteReuseStrategy } from "@angular/router";
import { CustomRouteReuseStrategy } from "./common/reuse-strategy";

registerLocaleData(zh);

@NgModule({
   declarations: [
      AppComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      IconsProviderModule,
      NgZorroAntdModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
   ],
   providers: [
      httpInterceptorProviders,
      { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
