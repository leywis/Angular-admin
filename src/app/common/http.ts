import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})

export class Http {
    constructor(private http: HttpClient) { }

    get(url): Observable<any> {
        return this.http.get(url) as Observable<any>
    }

    getParam(url, params): Observable<any> {
        if (params) {
            if (!(params instanceof URLSearchParams || params instanceof FormData)) {
                params = Object.assign({}, params)
                Object.keys(params).forEach((key, index) => {
                    if (typeof (params[key]) == 'string') {
                        params[key] = params[key].replace(/(^\s*)|(\s*$)/g, '')
                    }
                    if (params[key] == null || params[key] === '' || params[key] == undefined) {
                        delete params[key]
                    }
                })
            }
        }
        Object.keys(params).map((key, index) => {
            if (index == 0) {
                url += '?' + key + '=' + params[key]
            } else {
                url += '&' + key + '=' + params[key]
            }
        })
        return this.http.get(url) as Observable<any>
    }

    post(url, params): Observable<any> {
        if (params) {
            if (!(params instanceof URLSearchParams || params instanceof FormData)) {
                params = Object.assign({}, params)
                Object.keys(params).forEach(key => {
                    if (typeof (params[key]) == 'string') {
                        params[key] = params[key].replace(/(^\s*)|(\s*$)/g, '')
                    }
                    if (params[key] == null || params[key] === '' || params[key] == undefined) {
                        delete params[key]
                    }
                });
            }
        }
        return this.http.post(url, params) as Observable<any>
    }

    delete(url, params): Observable<any> {
        Object.keys(params).map((key, index) => {
            if (index == 0) {
                url += '?' + key + '=' + params[key]
            } else {
                url += '&' + key + '=' + params[key]
            }
        })
        return this.http.delete(url, params) as Observable<any>
    }

    put(url, params): Observable<any> {
        if (params) {
            if (!(params instanceof URLSearchParams || params instanceof FormData)) {
                params = Object.assign({}, params)
                Object.keys(params).forEach((key, index) => {
                    if (typeof (params[key]) == 'string') {
                        params[key] = params[key].replace(/(^\s*)|(\s*$)/g, '')
                    }
                    if (params[key] == null || params[key] === '' || params[key] == undefined) {
                        delete params[key]
                    }
                })
            }
        }
        Object.keys(params).map((key, index) => {
            if (index == 0) {
                url += '?' + key + '=' + params[key]
            } else {
                url += '&' + key + '=' + params[key]
            }
        })
        return this.http.put(url, params) as Observable<any>
    }

    /** post 导出Excel */
    postBlob(url: string, params): any {
        return this.http.post(url, params, { responseType: 'blob', observe: 'response' });
    }

    /** get 导出Excel */
    getBlob(url: string, params): any {
        if (params) {
            if (!(params instanceof URLSearchParams || params instanceof FormData)) {
                params = Object.assign({}, params)
                Object.keys(params).forEach((key, index) => {
                    if (typeof (params[key]) == 'string') {
                        params[key] = params[key].replace(/(^\s*)|(\s*$)/g, '')
                    }
                    if (params[key] == null || params[key] === '' || params[key] == undefined) {
                        delete params[key]
                    }
                });
            }
        }
        Object.keys(params).map((key, index) => {
            if (index === 0) {
                url += '?' + key + '=' + params[key]
            } else {
                url += '&' + key + '=' + params[key]
            }
        });
        return this.http.get(url, { responseType: 'blob', observe: 'response' });
    }
    /** post formData */
    postForm(url:string, params): Observable<any>{
        if (params) {
            if (!(params instanceof URLSearchParams || params instanceof FormData)) {
                params = Object.assign({}, params)
                Object.keys(params).forEach(key => {
                    if (typeof (params[key]) == 'string') {
                        params[key] = params[key].replace(/(^\s*)|(\s*$)/g, '')
                    }
                    if (params[key] == null || params[key] === '' || params[key] == undefined) {
                        delete params[key]
                    }
                });
            }
        }

        return this.http.post(url, params) as Observable<any>
    }
}
