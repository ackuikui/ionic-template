import {Component, OnInit} from '@angular/core';
import {IonicPage} from "ionic-angular";


@IonicPage()
@Component({
    templateUrl: './tabright.component.html'
})
export class TabRightComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
      console.log('right init');
    }


}
