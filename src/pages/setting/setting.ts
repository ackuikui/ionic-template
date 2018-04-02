import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'setting'
})
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController,
              public app: App,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  goBack() {
    // this.navCtrl.push('tabs');
    const nav = this.app.getRootNavs();
    nav[0].setRoot('tabs');
  }

}
