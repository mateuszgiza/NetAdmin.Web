import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ILoginModel, IToken } from '../models';

import '../../utils';

const SECRET_KEY = '_x_SECRET_x_';
const AUTH_KEY = 'auth-key';
const EXPIRE_TIME = 30;

@Injectable()
export class Authentication {
    constructor(
        private router: Router
    ) { }

    public authenticate(model: ILoginModel): void {
        if (this.checkPrivileges(model) === false) {
            this.logout();
            return;
        }

        let encodedToken = this.tokenFromLoginModel(model);
        let tokenString = this.buildEncodedToken(encodedToken);
        localStorage.setItem(AUTH_KEY, tokenString);
    }

    public logout(): void {
        this.removeToken();
        this.router.navigate(['/login']);
    }

    public get isAuthenticated(): boolean {
        let token = this.tokenModel;
        this.renewExpiration(token);

        return token !== null;
    }

    public get currentUser(): string {
        let token = this.tokenModel;
        return token.username || '';
    }

    private checkPrivileges(model: ILoginModel): boolean {
        return model.username === 'admin' &&
            model.password === 'admin';
    }

    private get tokenModel(): IToken {
        let encodedToken: string = localStorage.getItem(AUTH_KEY) || null;
        if (encodedToken === null ||
            encodedToken.length <= 0) {
            return null;
        }

        let decodedToken: string = atob(encodedToken);
        if (decodedToken.startsWith(SECRET_KEY) === false ||
            decodedToken.endsWith(SECRET_KEY) === false) {
            return null;
        }

        let tokenString = decodedToken.replaceAll(SECRET_KEY, '').slice(1, -1);
        let token: IToken = null;
        try {
            token = <IToken>JSON.parse(tokenString);
            token = this.removeTokenIfExpired(token);
        }
        catch (e) {
            console.log(`Error when parsing token!`);
            this.removeToken();
        }

        return token;
    }

    private buildEncodedToken(token: IToken): string {
        let tokenString = JSON.stringify(token);
        let saltedToken = `${SECRET_KEY}_${tokenString}_${SECRET_KEY}`;
        let encodedToken = btoa(saltedToken);

        return encodedToken;
    }

    private tokenFromLoginModel(model: ILoginModel): IToken {
        let token = <IToken>{
            username: model.username
        };
        this.renewExpiration(token);

        return token;
    }

    private renewExpiration(token: IToken): void {
        if (token === null) {
            return;
        }

        console.log(`Renewing expiration time. Current: ${token.expirationDate.toISOString()}`);
        token.expirationDate = new Date().addSeconds(EXPIRE_TIME);
        console.log(`New expiration date: ${token.expirationDate.toISOString()}`);
    }

    private isTokenExpired(token: IToken): boolean {
        if (token === null) {
            return true;
        }

        let isExpired = token.expirationDate < new Date();

        if (isExpired) {
            console.log(`Token has expired!`);
        }

        return isExpired;
    }

    private removeTokenIfExpired(token: IToken): IToken {
        if (this.isTokenExpired(token)) {
            this.removeToken();
            token = null;
        }

        return token;
    }

    private removeToken(): void {
        localStorage.removeItem(AUTH_KEY);
    }
}
