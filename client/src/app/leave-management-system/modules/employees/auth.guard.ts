import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { userRoleArray } from "../../models/user.model";
import { AuthService } from "../../services/auth/auth.service";
// import { AuthService } from "src/app/EBMSuite/services/auth/auth.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const isLoggedIn = this.authService.isLoggedIn();
        this.authService.redirectUrl = state.url ? state.url : "/leave/dashboard/admin";

        if (isLoggedIn) {
            if(route.data.roles && route.data.roles.indexOf(userRoleArray)===-1){
                return true;
            }
            
            
        } else {
            this.router.navigateByUrl("/auth/login");
        }
        return false;
    }
}
