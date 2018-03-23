import {NgModule} from "@angular/core";
import {TabLeftComponent} from "./tableft.component";
import {IonicPageModule} from "ionic-angular";

@NgModule({
    declarations: [
      TabLeftComponent
    ],
    imports: [

        IonicPageModule.forChild(TabLeftComponent)
    ],
    providers: [
    ]
})

export class TabLeftComponentModule { }
