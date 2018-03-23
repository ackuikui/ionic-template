import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginComponentModule} from "../components/auth/login/login.component.module";



import {TabsComponentModule} from "../components/tabs/tabs.component.module";
import {TabCenterComponentModule} from "../components/tabcenter/tabcenter.component.module";
import {TabLeftComponentModule} from "../components/tableft/tableft.component.module";
import {TabRightComponentModule} from "../components/tabright/tabright.component.module";
import {TabsPage} from "../pages/tabs/tabs";
import {HomePage} from "../pages/home/home";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {TabLeftComponent} from "../components/tableft/tableft.component";
import {TabsComponent} from "../components/tabs/tabs.component";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    AboutPage,
    ContactPage,
  ],
  imports: [
    BrowserModule,
    TabsComponentModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    AboutPage,
    ContactPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
