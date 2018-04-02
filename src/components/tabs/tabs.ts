import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AlertController, App, IonicPage, MenuController, ModalController, NavController,
  ViewController
} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs";



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
                public viewCtrl: ViewController,
                public app: App) {

    }

    ngOnInit() {
      this.language = localStorage.getItem('language');

      console.log('tabs init');
      let subscription = this.viewCtrl.willEnter.subscribe( () => {
        // do my stuff here
        console.log('will enter'); // nav pop,tabs view not load again, but
      });
    }


  ionViewDidLoad() {
    console.log("I'm alive!");
  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
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

  selectSkin() {
    console.log(this.viewCtrl.pageRef());
    this.viewCtrl.pageRef().nativeElement.className = 'ion-page show-page dark';
  }
  logout() {
    localStorage.removeItem('authId');
    // this.navCtrl.popToRoot();//抖动
    const nav = this.app.getRootNavs();
    nav[0].setRoot('login');
  }
}
