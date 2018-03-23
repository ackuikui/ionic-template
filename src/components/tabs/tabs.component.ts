import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from "ionic-angular";
import {TabLeftComponent} from "../tableft/tableft.component";
import {TabCenterComponent} from "../tabcenter/tabcenter.component";
import {TabRightComponent} from "../tabright/tabright.component";


@IonicPage()
@Component({
    templateUrl: './tabs.component.html'
})
export class TabsComponent implements OnInit {

  tableft = TabLeftComponent;
  tabcenter = TabCenterComponent;
  tabright = TabRightComponent;



  constructor() {
    }

    ngOnInit() {
      console.log('tabs init');
    }



}
