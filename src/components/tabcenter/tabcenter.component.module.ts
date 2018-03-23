import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {TabCenterComponent} from "./tabcenter.component";

@NgModule({
    declarations: [
      TabCenterComponent
    ],
    imports: [

        IonicPageModule.forChild(TabCenterComponent)
    ],
    providers: [
    ]
})

export class TabCenterComponentModule { }
