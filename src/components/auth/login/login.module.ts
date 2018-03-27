import {NgModule} from "@angular/core";
import {LoginComponent} from "./login";
import {IonicPageModule} from "ionic-angular";
import {SharedModule} from "../../../common/shared/shared.module";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        SharedModule,
        IonicPageModule.forChild(LoginComponent)
    ],
    providers: [
    ]
})

export class LoginComponentModule { }
