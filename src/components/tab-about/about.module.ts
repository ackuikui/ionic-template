import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";

import {AboutComponent} from "./about";
import {SharedModule} from "../../common/shared/shared.module";

@NgModule({
    declarations: [
      AboutComponent
    ],
    imports: [
      SharedModule,
        IonicPageModule.forChild(AboutComponent)
    ],
    providers: [
    ]
})

export class AboutModule { }
