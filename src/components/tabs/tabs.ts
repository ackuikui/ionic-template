import {Component, OnInit} from '@angular/core';
import {IonicPage} from "ionic-angular";



@IonicPage()
@Component({
    templateUrl: './tabs.html'
})
export class Tabs implements OnInit {

    tab1 = 'about';
    tab2 = 'home';
    tab3 = 'contact';

    title1 = 'About';
    title2 = 'Home';
    title3 = 'Contact';

    constructor() {

    }

    ngOnInit() {
      console.log('tabs init');
    }

}
