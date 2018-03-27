import {NgModule} from "@angular/core";
import {LoginComponent} from "./login";
import {IonicPageModule} from "ionic-angular";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [

        IonicPageModule.forChild(LoginComponent)
    ],
    providers: [
    ]
})

export class LoginComponentModule { }
