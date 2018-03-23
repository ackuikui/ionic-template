import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from "ionic-angular";


@IonicPage()
@Component({
    templateUrl: './tabcenter.component.html'
})
export class TabCenterComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
      console.log('mid init');
    }


}
