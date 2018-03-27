import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from "ionic-angular";


@IonicPage({
  name: 'login'
})
@Component({
    selector: 'login-component',
    templateUrl: './login.html'
})
export class LoginComponent implements OnInit {

    constructor(public nav: NavController) {
    }

    ngOnInit() {
      console.log('init');
    }


    async login(account, pwd) {
      console.log(account, pwd);
      this.nav.push('Tabs');
    }


}