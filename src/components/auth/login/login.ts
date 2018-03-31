import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from "ionic-angular";


@IonicPage({
  name: 'login',
  priority: 'high'
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
      localStorage.setItem('authId', 'has_login');
      this.nav.push('tabs');
    }


}
