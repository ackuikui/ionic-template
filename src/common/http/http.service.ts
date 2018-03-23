import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptionsArgs} from "@angular/http";
import {Observable} from "rxjs";
import * as _ from "lodash";
import {URLSearchParams} from "@angular/http";
import {EnvironmentConfig} from "../config/config";

export interface IMeta {
    pagination?: {
        count?: number,
        currentPage?: number,
        nextPage?: number,
        prevPage?: number
        totalCount?: number,
    }
}

export interface IFilter {
    page: number,
    limit: number,
    sorting?: string,
    search?: '',
    include?: string,
    groupId?: string,
    leaveTypeId?: string,
    month?: string,
    isAll?: boolean,
    name?: string
    // locationId?: string
}

@Injectable()
export class HttpService {
    constructor(private config: EnvironmentConfig,
                private http: Http) {
    }

    createAuthorizationHeader(headers: Headers): Headers {
        if (_.isUndefined(headers)) headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let token = localStorage.getItem('access_token');
        if (token !== null) headers.append('Authorization', `${localStorage.getItem('token_type')} ${token}`);
        headers.append('Accept-Language', localStorage.getItem('language') === 'zh-hk' ? 'en-us;q=0.1,zh-hk;q=0.2' : 'zh-hk;q=0.1,en-us;q=0.2');
        return headers;
    }

    getCurrentTeamId(): string {
        return localStorage.getItem('team');
    }

    get(url: string, options: RequestOptionsArgs = {params: new URLSearchParams()}): Observable<any> {
        // const _that = this;
        options.headers = this.createAuthorizationHeader(options.headers);
        if (options.params instanceof URLSearchParams) options.params.set('teamId', this.getCurrentTeamId());
        return this.http
            .get(this.config.apiEndPoint + url, options)
            // .catch(this.handleError);
            .catch((error) => {
                const errorMsg = error.json().message || `Server error`;

                // throw an application level error
                // if (error.json().code === 11000 && error.json().message === 'authorization token is incorrect.') _that.router.navigate(['/auth/login']);
                return Observable.throw(errorMsg);
            });
    }

    getWithoutAppId(url: string, options: RequestOptionsArgs = {params: new URLSearchParams()}): Observable<any> {
        // const _that = this;
        options.headers = this.createAuthorizationHeader(options.headers);
        return this.http
            .get(this.config.apiEndPoint + url, options)
            // .catch(this.handleError);
            .catch((error) => {
                const errorMsg = error.json().message || `Server error`;

                // throw an application level error
                // if (error.json().code === 11000 && error.json().message === 'authorization token is incorrect.') _that.router.navigate(['/auth/login']);
                return Observable.throw(errorMsg);
            });
    }

    post(url: string, body: any = {}, options: RequestOptionsArgs = {}): Observable<any> {
        // const _that = this;
        options.headers = this.createAuthorizationHeader(options.headers);
        if (_.isUndefined(body.teamId)) body.teamId = this.getCurrentTeamId();
        return this.http
            .post(this.config.apiEndPoint + url, JSON.stringify(body), options)
            // .catch(this.handleError);
            .catch((error) => {
                const errorMsg = error.json().message || `Server error`;

                // throw an application level error
                // if (error.json().code === 11000 && error.json().message === 'authorization token is incorrect.') _that.router.navigate(['/auth/login']);
                return Observable.throw(errorMsg);
            });
    }

    put(url: string, body: any = {}, options: RequestOptionsArgs = {}): Observable<any> {
        // const _that = this;
        options.headers = this.createAuthorizationHeader(options.headers);
        body.teamId = this.getCurrentTeamId();
        return this.http
            .put(this.config.apiEndPoint + url, JSON.stringify(body), options)
            // .catch(this.handleError);
            .catch((error) => {
                const errorMsg = error.json().message || `Server error`;

                // throw an application level error
                // if (error.json().code === 11000 && error.json().message === 'authorization token is incorrect.') _that.router.navigate(['/auth/login']);
                return Observable.throw(errorMsg);
            });
    }

    delete(url: string, body: any = {}, options: RequestOptionsArgs = {}): Observable<any> {
        // const _that = this;
        options.headers = this.createAuthorizationHeader(options.headers);
        return this.http
            .delete(this.config.apiEndPoint + url + '?teamId=' + this.getCurrentTeamId(), options)
            // .catch(this.handleError);
            .catch((error) => {
                const errorMsg = error.json().message || `Server error`;

                // throw an application level error
                // if (error.json().code === 11000 && error.json().message === 'authorization token is incorrect.') _that.router.navigate(['/auth/login']);
                return Observable.throw(errorMsg);
            });
    }

    handleError(error: any): Observable<any> {
        let errorMsg = error.json().message || `Server error`;

        // throw an application level error
        return Observable.throw(errorMsg);
    }

    /**
     * Converts an object to a parametrised string.
     * @param object
     * @returns {string}
     */
    objectToParams(object: any): string {
        //不编码
        return Object.keys(object).map((key) => `${key}=${object[key]}`).join('&');

        //编码
        // return Object.keys(object).map(
        //   (key) =>
        //     _.isObject(object[key]) ?
        //       this.subObjectToParams(encodeURIComponent(key), object[key]) :
        //       `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`
        // ).join('&');
    }

    /**
     * Converts a sub-object to a parametrised string.
     * @param object
     * @returns {string}
     */
    private subObjectToParams(key: string, object: any): string {
        return Object.keys(object).map((childKey) => _.isObject(object[childKey]) ?
            this.subObjectToParams(`${key}[${encodeURIComponent(childKey)}]`, object[childKey]) :
            `${key}[${encodeURIComponent(childKey)}]=${encodeURIComponent(object[childKey])}`
        ).join('&');
    }
}
