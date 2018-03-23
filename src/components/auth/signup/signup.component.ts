import {Component, OnInit} from '@angular/core';
import {Auth} from '../auth.service';
import * as _ from 'lodash';
import {TranslateService} from "@ngx-translate/core";
import {IonicPage, NavController} from "ionic-angular";
import {NativeService} from "../../../providers/native.service";
import {StatusBar} from '@ionic-native/status-bar';

@IonicPage()
@Component({
    selector: 'signup-component',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

    email: string;
    password: string;
    confirm_password: string;
    signupLoading = false;
    language: string;
    languageId: number;

    constructor(private auth: Auth,
                private translate: TranslateService,
                public nav: NavController,
                private nativeService: NativeService,
                private statusBar: StatusBar) {
    }


    ngOnInit() {
        this.language = !_.isNull(localStorage.getItem('language')) ? localStorage.getItem('language') : 'en-us';
        this.setLanguage(this.language);
    }

    async signup() {
        this.signupLoading = true;
        this.nativeService.showLoading();
        try {
            await this.auth.signUp(this.email, this.password, this.languageId).toPromise();
            await this.auth.login(this.email, this.password).toPromise();
            this.nativeService.statusBarStyle(`#41b4b0`);
            this.nav.push('TeamListComponent');
            this.signupLoading = false;
        } catch (err) {
            this.nativeService.showToast(err);
            this.signupLoading = false;
        } finally {
            this.nativeService.hideLoading();
        }
    }

    setLanguage(lang: string): void {
        this.languageId = this.getLanguageId(lang);
        localStorage.setItem('language', lang);
        this.language = lang;
        this.translate.use(lang);
    }

    getLanguageId(str: string): number {
        let id: number;
        if (str === 'en-us') id = 1;
        if (str === 'zh-hk') id = 2;
        if (str === 'zh-cn') id = 3;
        return id;
    }

    goBack(){
        this.nav.pop();
    }

}
