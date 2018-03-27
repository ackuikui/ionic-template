import {Component, OnInit} from '@angular/core';
import {IonicPage} from "ionic-angular";



@IonicPage()
@Component({
    templateUrl: './tabs.component.html'
})
export class TabsComponent implements OnInit {

  tableft = 'TabLeftComponent';
  tabcenter = 'TabCenterComponent';
  tabright = 'TabRightComponent';


  constructor() {
    }

    ngOnInit() {
      console.log('tabs init');
    }



}
