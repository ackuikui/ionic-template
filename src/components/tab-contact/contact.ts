import {Component, OnInit} from '@angular/core';
import {IonicPage} from "ionic-angular";


@IonicPage({
  name: 'contact'
})
@Component({
    templateUrl: './contact.html'
})
export class ContactComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
      console.log('contact init');
    }


}
