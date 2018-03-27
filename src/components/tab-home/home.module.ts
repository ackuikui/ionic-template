import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";

import {HomeComponent} from "./home";

@NgModule({
    declarations: [
      HomeComponent
    ],
    imports: [

        IonicPageModule.forChild(HomeComponent)
    ],
    providers: [
    ]
})

export class HomeModule { }
