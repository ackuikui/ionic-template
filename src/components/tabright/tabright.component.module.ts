import {NgModule} from "@angular/core";
import {TabRightComponent} from "./tabright.component";
import {IonicPageModule} from "ionic-angular";

@NgModule({
    declarations: [
      TabRightComponent
    ],
    imports: [

        IonicPageModule.forChild(TabRightComponent)
    ],
    providers: [
    ]
})

export class TabRightComponentModule { }
