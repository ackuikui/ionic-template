import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from "ionic-angular";


@IonicPage()
@Component({
    templateUrl: './tableft.component.html'
})
export class TabLeftComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
      console.log('left init');
    }


}