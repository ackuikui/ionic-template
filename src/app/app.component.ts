import {Component, OnInit} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TranslateService} from "@ngx-translate/core";


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  rootPage = '';
  language = 'en-us';

  constructor(public translate: TranslateService,
              platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      splashScreen.hide();

      translate.setDefaultLang('en-us');

      this.setRootPage();
    });
  }

  ngOnInit(): void {
    this.language = localStorage.getItem('language') || 'en-us';
    this.setLanguage(this.language);
  }

  async setRootPage(){
    this.rootPage = localStorage.getItem('authId') ? 'tabs' : 'login';
  }

  setLanguage(lang: string): void{
    localStorage.setItem('language', lang);
    this.language = lang;
    this.translate.use(lang);
  }
}
