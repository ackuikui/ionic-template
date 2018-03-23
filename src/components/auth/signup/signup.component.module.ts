import {NgModule} from "@angular/core";
import {SignupComponent} from "./signup.component";
import {IonicPageModule} from "ionic-angular";
import {SharedModule} from "../../../common/shared/shared.module";
import {LogoComponentModule} from "../../../common/logo/logo.component.module";

@NgModule({
    declarations: [
        SignupComponent
    ],
    imports: [
        SharedModule,
        LogoComponentModule,
        IonicPageModule.forChild(SignupComponent)
    ]
})

export class SignupComponentModule { }
