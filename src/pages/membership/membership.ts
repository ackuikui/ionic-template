import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the MembershipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'membership'
})
@Component({
  selector: 'page-membership',
  templateUrl: 'membership.html',
})
export class MembershipPage implements OnInit{

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
  }

  ngOnInit() {
    // let subscription = this.viewCtrl.willEnter.subscribe( () => {
    //   // do my stuff here
    //   console.log('membership will enter');
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipPage');
  }

}
