import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";

import {Tabs} from "./tabs";
import {SharedModule} from "../../common/shared/shared.module";


@NgModule({
    declarations: [
      Tabs,
    ],
    imports: [
      SharedModule,
      IonicPageModule.forChild(Tabs)
    ]
})


export class TabsModule { }
