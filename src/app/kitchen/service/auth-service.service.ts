import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { flatMap, map, mergeMap, Observable, of, take } from 'rxjs';
import { Staff } from '../api/staff';
import { em } from '@fullcalendar/core/internal-common';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private fireAuth: AngularFireAuth,
        private router: Router,
        private firestore: AngularFirestore
    ) {
    }

    private checkSuperUserStatus(email: string): Observable<boolean> {
        let staffs$ = this.firestore.collection<Staff>('/staffs', ref => ref.where("email", "==", email).limit(1)).valueChanges().pipe(mergeMap(staffs => staffs));
        return staffs$.pipe(map(data => {
            let superusers = data.groups.find(e => e == 'SUPERUSER');
            return superusers !== undefined && superusers !== null;
        }));

    }


    isAuthorized(): Observable<boolean> {
        let email = localStorage.getItem('user');
        if (email === null || email === undefined) {
            this.router.navigate(['/auth/login']);
            return of(false);
        }
        return this.checkSuperUserStatus(email).pipe(map(isSuperUser => {
            if (isSuperUser) {
                return true;
            } else {
                this.router.navigate(['/auth/login']);
                return false;
            }
        }));
    }


    login(auth: { email: string, password: string }) {
        this.fireAuth.signInWithEmailAndPassword(auth.email, auth.password).then(res => {
            this.checkSuperUserStatus(auth.email).pipe(take(1)).subscribe(isSuperUser => {
                if (isSuperUser) {
                    localStorage.setItem('user', auth.email);
                    this.router.navigate(['/']);
                } else {
                    this.router.navigate(['/auth/login']);
                    localStorage.removeItem('user');
                }
            });
        }, err => {
            this.router.navigate(['/auth/login']);
            localStorage.removeItem('user');
        }
        );
    }

    logout() {
        localStorage.removeItem('user')
        this.fireAuth.signOut().then(() => {
            this.isAuthorized();
        }, err => {
            alert(err.message);
        })

    }

}
