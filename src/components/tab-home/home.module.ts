import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";

import {HomeComponent} from "./home";
import {SharedModule} from "../../common/shared/shared.module";

@NgModule({
    declarations: [
      HomeComponent
    ],
    imports: [
        SharedModule,
        IonicPageModule.forChild(HomeComponent)
    ],
    providers: [
    ]
})

export class HomeModule { }
