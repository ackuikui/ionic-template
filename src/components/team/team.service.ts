import {Injectable} from "@angular/core";
import {HttpService, IMeta} from "../../common/http/http.service";
import {Observable} from "rxjs";

export interface ITeam {
    id?: string,
    name?: string,
}

export class Team {
    id: string;
    name: string;

    constructor(item?: ITeam) {
        if (item) {
            this.id = item.id;
            this.name = item.name;
        }
    }
}

export interface IGetTeam {
    status: boolean,
    meta: IMeta,
    result: Team[]
}

@Injectable()
export class TeamService {
    constructor(private httpService: HttpService) {
    }

    get(data: any = {}): Observable<IGetTeam> {
        let options = {
            params: new URLSearchParams(this.httpService.objectToParams(data))
        };
        options.params.set('include', 'currency');
        return this.httpService
            .getWithoutAppId(`t/teams`, options)
            .map(res => res.json())
            .map(res => {
                res.result = res.result.map((item) => new Team(item));
                return res;
            })
    }


    find(teamId: string, data: any = {}): Observable<Team> {
        let options = {
            params: new URLSearchParams(this.httpService.objectToParams(data))
        };
        options.params.set('include', 'currency,defaultApprovers');
        return this.httpService
            .get(`t/teams/${teamId}`, options)
            .map(res => res.json())
            .map(res => {
                res.result = new Team(res.result);
                return res.result;
            })
    }

    delete(id: number): Observable<Team> {
        return this.httpService
            .delete(`t/teams/${id}`)
            .map(res => res.json().result)
            .map(res => new Team(res));
    }

    store(data: Team): Observable<Team> {
        return this.httpService
            .post('t/teams', data)
            .map(res => res.json().result)
            .map(res => new Team(res));
    }

    update(data: Team): Observable<Team> {
        return this.httpService
            .put(`t/teams/${data['id']}`, data)
            .map(res => res.json().result)
            .map(res => new Team(res));
    }
}
