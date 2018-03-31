import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from "ionic-angular";


@IonicPage({
  name: 'home',
  priority: 'high'
})
@Component({
    templateUrl: './home.html'
})
export class HomeComponent implements OnInit {

    constructor(public navCtrl: NavController) {
    }

    ngOnInit() {
      console.log('home init');
    }

  goPage() {
      this.navCtrl.push('favorite')
  }

}
