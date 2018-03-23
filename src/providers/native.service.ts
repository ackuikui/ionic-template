/**
 * Created by yanxiaojun617@163.com on 12-27.
 */
import {Injectable} from "@angular/core";
import {ToastController, LoadingController, Platform, Loading, AlertController} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Toast} from "@ionic-native/toast";
import {AppMinimize} from "@ionic-native/app-minimize";
// import {Observable} from "rxjs";

// declare var LocationPlugin;
// declare var AMapNavigation;

@Injectable()
export class NativeService {
    private loading: Loading;

    constructor(private platform: Platform,
                private toastCtrl: ToastController,
                private alertCtrl: AlertController,
                private statusBar: StatusBar,
                private splashScreen: SplashScreen,
                private toast: Toast,
                private appMinimize: AppMinimize,
                private loadingCtrl: LoadingController) {
    }

    /**
     * 状态栏
     */
    statusBarStyle(statusColor:string): void {
        if (this.isMobile()) {
            this.statusBar.overlaysWebView(false);
            this.statusBar.styleLightContent();
            this.statusBar.backgroundColorByHexString(statusColor);//3261b3
        }
    }

    /**
     * 隐藏启动页面
     */
    splashScreenHide(): void {
        this.isMobile() && this.splashScreen.hide();
    }

    /**
     * 调用最小化app插件
     */
    minimize(): void {
        this.appMinimize.minimize()
    }

    /**
     * 是否真机环境
     */
    isMobile(): boolean {
        return this.platform.is('mobile') && !this.platform.is('mobileweb');
    }

    /**
     * 是否android真机环境
     */
    isAndroid(): boolean {
        return this.isMobile() && this.platform.is('android');
    }

    /**
     * 是否ios真机环境
     */
    isIos(): boolean {
        return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
    }

    /**
     * 只有一个确定按钮的弹出框.
     * 如果已经打开则不再打开
     */
    alert = (() => {
        let isExist = false;
        return (title: string, subTitle: string = '', message: string = '', callBackFun = null): void => {
            if (!isExist) {
                isExist = true;
                this.alertCtrl.create({
                    title: title,
                    subTitle: subTitle,
                    message: message,
                    buttons: [{
                        text: '确定', handler: () => {
                            isExist = false;
                            callBackFun && callBackFun();
                        }
                    }],
                    enableBackdropDismiss: false
                }).present();
            }
        };
    })();

    /**
     * 统一调用此方法显示提示信息
     * @param message 信息内容
     * @param duration 显示时长
     */
    showToast(message: string = '操作完成', duration: number = 2000): void {
        if (this.isMobile()) {
            this.toast.show(message, String(duration), 'center').subscribe();
        } else {
            this.toastCtrl.create({
                message: message,
                duration: duration,
                position: 'middle',
                showCloseButton: false
            }).present();
        }
    };

    /**
     * 统一调用此方法显示loading
     * @param content 显示的内容
     */
    showLoading(content: string = ''): void {
        if(!this.loading){//如果loading已经存在则不再打开
            let loading = this.loadingCtrl.create({
                content: content
            });
            loading.present();
            this.loading = loading;
        }
    };

    /**
     * 关闭loading
     */
    hideLoading(): void {
        setTimeout(() => {//延迟200毫秒可以避免嵌套请求loading重复打开和关闭
            this.loading && this.loading.dismiss();
            this.loading = null;
        }, 200);
    };

}
