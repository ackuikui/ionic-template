import {Component, OnInit, OnDestroy} from '@angular/core';
import {Team, TeamService} from '../team.service';
import * as _ from 'lodash';
import {App, Events, IonicApp, IonicPage, Keyboard, NavController, Platform} from "ionic-angular";
import {LoginCheckResolve} from "../../auth/login-check-resolve.service";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from "@ionic-native/splash-screen";
import {NativeService} from "../../../providers/native.service";

@IonicPage()
@Component({
    selector: 'team-list-component',
    templateUrl: './team-list.component.html'
})

export class TeamListComponent implements OnInit, OnDestroy {
    public rows: Team[] = [];
    subscription: any;
    invitations: any[] = [];
    approvalData: any = {
        employeeId: '',
        teamId: '',
    };

    public teamLoading = false;
    public inviteLoading = false;
    public isLogined = false;

    backButtonPressed: boolean = false;

    constructor(private platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                private teamService: TeamService,
                private auth: Auth,
                public nav: NavController,
                private loginCheckResolve: LoginCheckResolve,
                public app: App,
                public events: Events,
                private nativeService: NativeService,
                private ionicApp: IonicApp,
                private keyboard: Keyboard,) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            this.registerBackButtonAction();//注册android返回按键事件
        });
        console.log('team constructor');
    }

    async ionViewCanEnter(): Promise<Boolean> {
        return await this.loginCheckResolve.resolve();
    }

    ngOnInit(): void {
        this.reload();
        this.reloadTeamInvitations();
    }

    ngOnDestroy(): void {
        if (!_.isUndefined(this.subscription)) {
            this.subscription.unsubscribe();
        }
    }

    async reload(): Promise<any> {
        window.scrollTo(0, 0);
        this.teamLoading = true;
        try {
            const result = await this.teamService.get().toPromise();
            this.rows = result.result;
            this.isLogined = true;
            this.teamLoading = false;
        } catch (err) {
            // this.toasterService.pop('error', 'Error', err);
            // this.router.navigate(['/auth/login']);
            this.teamLoading = false;
        }
    }

    onEnter(row: Team): void {
        localStorage.setItem('team', row.id);
        localStorage.setItem('teamName', row.name);
        this.nav.push('TabsPage');
    }

    async reloadTeamInvitations(): Promise<any> {
        try {
            this.inviteLoading = true;
            const profile = JSON.parse(localStorage.getItem('profile'));
            const result = await this.teamService.getInvitation().toPromise();
            this.invitations = result.result;
        } catch (err) {
            // this.toasterService.pop('error', 'Error', err);
        }
        this.inviteLoading = false;
    }

    async approveInvitation(data): Promise<any> {
        try {
            this.approvalData.employeeId = data.id;
            this.approvalData.teamId = data.team.id;
            await this.teamService.acceptInvitation(this.approvalData).toPromise();
            this.reload();
            this.reloadTeamInvitations();
        } catch (err) {
            this.nativeService.showToast(err);
        }
    }

    async rejectInvitation(data): Promise<any> {
        try {
            this.approvalData.employeeId = data.id;
            this.approvalData.teamId = data.team.id;
            await this.teamService.rejectInvitation(this.approvalData).toPromise();
            this.reloadTeamInvitations();
        } catch (err) {
            this.nativeService.showToast(err);
        }
    }

    onLogout(): void {
        this.auth.logout();
        this.isLogined = false;
        const nav = this.app.getRootNavs();
        localStorage.removeItem('isRemember');
        nav[0].setRoot('LoginComponent');
        // this.router.navigate(['./auth/login']);
    }

    registerBackButtonAction() {
        if (_.isNull(localStorage.getItem('backButtonIdx'))) localStorage.setItem('backButtonIdx', '0');
        if (!this.nativeService.isAndroid()) {
            return;
        }
        this.platform.registerBackButtonAction(() => {
            this.events.publish('android:backButtonAction');
            if (this.keyboard.isOpen()) {//如果键盘开启则隐藏键盘
                this.keyboard.close();
                return;
            }
            //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
            // this.ionicApp._toastPortal.getActive() ||this.ionicApp._loadingPortal.getActive()|| this.ionicApp._overlayPortal.getActive()
            let activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._toastPortal.getActive() || this.ionicApp._overlayPortal.getActive();
            if (activePortal) {
                activePortal.dismiss();
                return;
            }
            return this.nav.canGoBack() ? this.nav.pop({animate:false}) : this.nativeService.minimize();
        }, parseInt(localStorage.getItem('backButtonIdx')) + 1);
    }

    //双击退出提示框
    showExit() {
        if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
            this.platform.exitApp();
        } else {
            this.nativeService.showToast('再按一次退出应用');
            this.backButtonPressed = true;
            setTimeout(() => { //2秒内没有再次点击返回则将触发标志标记为false
                this.backButtonPressed = false;
            }, 2000)
        }
    }
}
