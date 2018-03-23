import {Component, OnInit} from '@angular/core';
import {Auth} from '../auth.service';
import * as _ from 'lodash';
import {UserProfile} from "../../user-setting/user-profile/user-profile.class";
import {TranslateService} from "@ngx-translate/core";
import {IonicPage, NavController} from "ionic-angular";
import {UserProfileService} from "../../user-setting/user-profile/user-profile.service";
import {NativeService} from "../../../providers/native.service";
import {StatusBar} from '@ionic-native/status-bar';

@IonicPage()
@Component({
    selector: 'login-component',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    email: string;
    password: string;
    loginLoading: boolean = false;
    user: UserProfile = new UserProfile();

    languageId: number = 1;

    isRemember: boolean = false;

    constructor(private auth: Auth,
                private userProfileService: UserProfileService,
                private translate: TranslateService,
                public nav: NavController,
                public nativeService: NativeService,
                private statusBar: StatusBar) {
    }

    ngOnInit() {
        const lang = !_.isNull(localStorage.getItem('language')) ? localStorage.getItem('language') : 'en-us';
        this.languageId = this.getLanguageId(lang);
        this.nativeService.statusBarStyle(`#183457`);
    }

    goForgetPassword() {
        // this.router.navigate(['/auth/forgetPassword']);
    }

    async login(email, pwd) {
        this.loginLoading = true;
        this.nativeService.showLoading();
        try {
            await this.auth.login(email, pwd).toPromise();
            await this.handleUserProfile();
            this.nativeService.statusBarStyle(`#41b4b0`);
            this.nav.push('TeamListComponent');
            this.loginLoading = false;
            if (this.isRemember) {
                const data = JSON.stringify({
                    email: email,
                    password: pwd
                });
                localStorage.setItem('isRemember', data);
            } else {
                localStorage.removeItem('isRemember');
            }
        } catch (err) {
            this.nativeService.showToast(err);
            this.loginLoading = false;
            console.log(err);
            err.code === 11004 ? this.nav.push('SignupComponent') : this.nav.setRoot('LoginComponent');
        } finally {
            this.nativeService.hideLoading();
        }
    }

    goSignup(){
        this.nav.push('SignupComponent');
    }

    getLanguageId(str: string): number {
        let id: number;
        if (str === 'en-us') id = 1;
        if (str === 'zh-hk') id = 2;
        if (str === 'zh-cn') id = 3;
        return id;
    }

    async handleUserProfile(): Promise<any> {
        const result = await this.userProfileService.get().toPromise();
        this.user = result;
        // update language
        this.user.languageId = this.languageId.toString();
        const data = this.user.changeLanguage();
        const res = await this.userProfileService.update(data).toPromise();
    }

}
