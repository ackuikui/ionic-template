import {Injectable} from '@angular/core';
import {Auth} from "./auth.service";

@Injectable()
export class LoginCheckResolve {

    constructor(private auth: Auth) {
    }

    async resolve(): Promise<Boolean> {
        if (this.auth.isAuthenticated()) {
            return true;
        } else {
            return false;
        }
    }
}
