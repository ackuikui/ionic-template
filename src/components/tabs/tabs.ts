import {Component, OnInit} from '@angular/core';
import {IonicPage} from "ionic-angular";
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

    constructor(public translate: TranslateService) {

    }

    ngOnInit() {
      console.log('tabs init');
    }


  changeLanguage(lang) {
    localStorage.setItem('language', lang);
    this.translate.use(lang);
  }

  logout() {
    localStorage.removeItem('authId');
  }
}
