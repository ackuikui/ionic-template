import {NgModule} from "@angular/core";
import {TeamListComponent} from "./team-list.component";
import {IonicPageModule} from "ionic-angular";
import {TeamModule} from "../team.module";
import {SharedModule} from "../../../common/shared/shared.module";

@NgModule({
    declarations: [
        TeamListComponent
    ],
    imports: [
        TeamModule,
        SharedModule,
        IonicPageModule.forChild(TeamListComponent)
    ]
})

export class TeamListComponentModule{}
