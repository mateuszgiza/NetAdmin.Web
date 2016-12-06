import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AppState } from '../../app.service';
import { ILoginModel } from '../models';

import '../../utils';

const SECRET_KEY = '_x_SECRET_x_';
const AUTH_KEY = 'auth-key';

@Injectable()
export class Authentication {
    constructor(
        private appState: AppState,
        private router: Router
    ) { }

    authenticate(model: ILoginModel): void {
        if (this.checkPrivileges(model) === false) {
            this.logout();
            return;
        }

        let key = `${SECRET_KEY}_${model.username}_${SECRET_KEY}`;
        this.appState.set(AUTH_KEY, btoa(key));
    }

    logout(): void {
        this.appState.set(AUTH_KEY, null);
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        let currentKey: string = this.appState.get(AUTH_KEY);
        let decodedKey = atob(currentKey);

        return currentKey != null &&
            currentKey.length > 0 &&
            decodedKey.startsWith(SECRET_KEY) &&
            decodedKey.endsWith(SECRET_KEY);
    }

    get currentUser(): string {
        let currentKey: string = this.appState.get(AUTH_KEY);
        let decodedKey: String = atob(currentKey);
        let user = decodedKey.replaceAll(SECRET_KEY, '').slice(1, -1);
        return user;
    }

    private checkPrivileges(model: ILoginModel): boolean {
        return model.username === 'admin' &&
            model.password === 'admin';
    }
}