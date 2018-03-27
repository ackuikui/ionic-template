import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from "ionic-angular";


@IonicPage()
@Component({
    selector: 'login-component',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    constructor(public nav: NavController) {
    }

    ngOnInit() {
      console.log('init');
    }


    async login(account, pwd) {
      console.log(account, pwd);
      this.nav.push('TabsComponent');
    }


}
