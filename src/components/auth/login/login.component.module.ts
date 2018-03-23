import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {IonicPageModule} from "ionic-angular";
import {SharedModule} from "../../../common/shared/shared.module";
import {LogoComponentModule} from "../../../common/logo/logo.component.module";
import {UserProfileService} from "../../user-setting/user-profile/user-profile.service";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        SharedModule,
        LogoComponentModule,
        IonicPageModule.forChild(LoginComponent)
    ],
    providers: [
        UserProfileService
    ]
})

export class LoginComponentModule { }
