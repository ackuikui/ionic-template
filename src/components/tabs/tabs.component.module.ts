import {NgModule} from "@angular/core";
import {TabsComponent} from "./tabs.component";
import {IonicPageModule} from "ionic-angular";
import {TabRightComponent} from "../tabright/tabright.component";
import {TabCenterComponent} from "../tabcenter/tabcenter.component";
import {TabLeftComponent} from "../tableft/tableft.component";

@NgModule({
    declarations: [
      TabsComponent
    ],
    imports: [

        IonicPageModule.forChild(TabsComponent)
    ],
    providers: [
    ],
    entryComponents: [
      TabLeftComponent,
      TabCenterComponent,
      TabRightComponent
    ]
})

export class TabsComponentModule { }
