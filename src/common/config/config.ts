import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable()
export class EnvironmentConfig {
    public apiEndPoint: string = environment.apiEndPoint;
}
