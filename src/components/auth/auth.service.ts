// import {Injectable, Inject}      from '@angular/core';
//
// @Injectable()
// export class Auth {
//   constructor(public authHttp: AuthHttp,
//                private httpService: HttpService,
//                private authConfig: AuthConfig,
//                public app: App) {
//    }
//
//   public startupTokenRefresh() {
//       // If the user is authenticated, use the token stream
//       // provided by angular2-jwt and flatMap the token
//       if (this.isAuthenticated()) {
//           try {
//               const source = this.authHttp.tokenStream.flatMap(
//                   token => {
//                       // Get the expiry time to generate
//                       // a delay in milliseconds
//                       const now: number = new Date().valueOf();
//                       const jwtExp: number = this.jwtHelper.decodeToken(token).exp;
//                       const exp: Date = new Date(0);
//                       exp.setUTCSeconds(jwtExp);
//
//                       let delay: number = exp.valueOf() - now - 300000;
//                       if (delay <= 0) delay = 0;
//                       // Use the delay in a timer to
//                       // run the refresh at the proper time
//                       return Observable.timer(delay);
//
//                   })
//                   .flatMap((result) => {
//                       return this.getNewJwt();
//                   });
//
//               source.subscribe(() => {
//                   this.scheduleRefresh();
//               });
//           } catch (err) {
//           }
//       }
//   }
// }
