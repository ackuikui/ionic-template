import {Component, OnInit} from '@angular/core';
import {IonicPage} from "ionic-angular";


@IonicPage({
  name: 'about'
})
@Component({
    templateUrl: './about.html'
})
export class AboutComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
      console.log('about init');
    }


}
