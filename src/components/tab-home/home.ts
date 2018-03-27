import {Component, OnInit} from '@angular/core';
import {IonicPage} from "ionic-angular";


@IonicPage({
  name: 'home',
  priority: 'high'
})
@Component({
    templateUrl: './home.html'
})
export class HomeComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
      console.log('home init');
    }


}
