import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, App, IonicPage, MenuController, ModalController, NavController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";



@IonicPage({
  name: 'tabs',
  priority: 'high'
})
@Component({
    templateUrl: './tabs.html'
})
export class Tabs implements OnInit {

    tab1 = 'about';
    tab2 = 'home';
    tab3 = 'contact';

    language = 'en-us';

    constructor(public translate: TranslateService,
                public navCtrl: NavController,
                public menuCtrl: MenuController,
                public alertCtrl: AlertController,
                public modalCtrl: ModalController,
                public app: App) {

    }

    ngOnInit() {
      this.language = localStorage.getItem('language');
      console.log('tabs init');
    }

  showLanguageSelect() {
    let alert = this.alertCtrl.create({
      title: 'select language',
      inputs: [
        {
          type: 'radio',
          label: 'English',
          value: 'en-us',
          checked: this.language === 'en-us'
        },
        {
          type: 'radio',
          label: '简体中文',
          value: 'zh-cn',
          checked: this.language === 'zh-cn'
        },
        {
          type: 'radio',
          label: '繁體中文',
          value: 'zh-hk',
          checked: this.language === 'zh-hk'
        }
      ],
      buttons: [
        {
          text: 'cancel',
          handler: data => console.log(data)
        },
        {
          text: 'OK',
          handler: data => {
            this.changeLanguage(data);
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * ways to open detail page
   * @param page
   */
  openPushPage(page) {
    this.menuCtrl.close();
    this.navCtrl.push(page);
  }
  openModalPage(page) {
    let modal = this.modalCtrl.create(page);
    modal.present();
    // this.menuCtrl.close();
  }
  openRootPage(page) {
    const nav = this.app.getRootNavs();
    nav[0].setRoot(page);
  }

  changeLanguage(lang) {
    this.language = lang;
    localStorage.setItem('language', lang);
    this.translate.use(lang);
  }

  logout() {
    localStorage.removeItem('authId');
    // this.navCtrl.popToRoot();//抖动
    const nav = this.app.getRootNavs();
    nav[0].setRoot('login');
  }
}
