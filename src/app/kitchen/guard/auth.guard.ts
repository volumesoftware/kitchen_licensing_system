import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../service/auth-service.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
class PermissionsService {

    constructor(private router: Router, private authService: AuthService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log('checking guard');
        return this.authService.isAuthorized();
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    return inject(PermissionsService).canActivate(next, state);
}