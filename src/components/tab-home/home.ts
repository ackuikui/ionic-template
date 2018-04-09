import {ApplicationRef, Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, NavController} from "ionic-angular";
import {Network} from "@ionic-native/network";
import { AndroidPermissions } from '@ionic-native/android-permissions';
declare let WifiWizard2: any;


@IonicPage({
  name: 'home',
  priority: 'high'
})
@Component({
    templateUrl: './home.html'
})
export class HomeComponent implements OnInit, OnDestroy {

  doInfiniteIndex = 1;
  faces = ['😜', '😆', '😄', '😎','☺'];
  InfiniteItems: any[] = [
    1,2,3,4,5,6,7,8,9,10
  ];
  log: any = 'none';
  connectSubscription: any;

  netInfo: any = {
    SSID: '',
    BSSID: '',
    connectList: [],
    wifiList: []
  };


    constructor(public navCtrl: NavController,
                public androidPermissions: AndroidPermissions,
                private appReference: ApplicationRef,
                public network: Network) {
    }


    ngOnInit() {

      if (typeof WifiWizard2 !== 'undefined' && WifiWizard2 && WifiWizard2.isWifiEnabled) {
        WifiWizard2.getCurrentSSID((s) => {this.netInfo.SSID = s}, (e) => {});
        WifiWizard2.getCurrentBSSID((s) => {this.netInfo.BSSID = s}, (e) => {});
      }

      document.addEventListener('online', () => console.log('Online!'), false);

      this.connectSubscription = this.network.onConnect().subscribe(() => {
        this.log = 'connected';
        // We just got a connection but we need to wait briefly
        // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            console.log('we got a wifi connection, woohoo!');
            this.log = 'got a wifi';
            if (WifiWizard2) {
              WifiWizard2.getCurrentSSID((s) => {this.netInfo.SSID = s;this.reFreshView();}, (e) => {});
              WifiWizard2.getCurrentBSSID((s) => {this.netInfo.BSSID = s;this.reFreshView();}, (e) => {});
              WifiWizard2.listNetworks((s) => {this.netInfo.connectList = s;this.reFreshView();
                console.log(s);}, (e) => {});
            }
          }
          this.reFreshView();
        }, 2000);
      });
      this.connectSubscription = this.network.onDisconnect().subscribe(() => {
        this.log = 'no connect';
        this.netInfo.SSID = '';
        this.netInfo.BSSID = '';
        this.reFreshView();
      });
    }

    reFreshView() {
      this.appReference.tick();
    }

    scan() {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
      );
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION]);

      WifiWizard2.scan((s) => {this.netInfo.wifiList = s;console.log(s);this.reFreshView();}, (s) => {console.log(s)}, (e) => {console.log(e)})
    }


    ngOnDestroy(): void {
      this.connectSubscription.unsubscribe();
    }


    goPage() {
        this.navCtrl.push('membership')
    }

    myHeaderFn(record, recordIndex, records) {
      if (recordIndex % 10 === 0) {
        return 'Header ' + recordIndex;
      }
      return null;
    }
    doInfinite(infiniteScroll){
      setTimeout(() => {
        let n = 5;
        while (n--){
          this.InfiniteItems.push(this.faces[Math.floor(Math.random() * 4 + 1)] + this.doInfiniteIndex++);
        }
        infiniteScroll.complete();
      }, 100);
    }
}
