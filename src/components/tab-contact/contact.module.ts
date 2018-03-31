import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";

import {ContactComponent} from "./contact";
import {SharedModule} from "../../common/shared/shared.module";

@NgModule({
    declarations: [
      ContactComponent
    ],
    imports: [
      SharedModule,
        IonicPageModule.forChild(ContactComponent)
    ],
    providers: [
    ]
})

export class ContactModule { }
