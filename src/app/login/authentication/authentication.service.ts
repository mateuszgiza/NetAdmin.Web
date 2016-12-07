import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ILoginModel, IToken } from '../models';

import '../../utils';
import * as moment from 'moment';

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
        this.saveToken(encodedToken);
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
            try {
            token = this.removeTokenIfExpired(token);
            }
            catch (e) {
                console.error(`Error with expire time!: ${e}`);
                this.removeToken();
            }
        }
        catch (e) {
            console.error(`Error when parsing token!`);
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
            username: model.username,
            expirationDate: moment().utc()
        };
        this.renewExpiration(token);

        return token;
    }

    private renewExpiration(token: IToken): void {
        if (token === null) {
            return;
        }

        if (token.expirationDate !== null &&
            token.expirationDate !== undefined) {
            console.log(`Renewing expiration time. Current: 
            ${moment(token.expirationDate).utc().toISOString()}`);
        }
        token.expirationDate = moment().add(EXPIRE_TIME, 'seconds').utc();
        console.log(`New expiration date: ${token.expirationDate.toISOString()}`);

        this.saveToken(token);
    }

    private isTokenExpired(token: IToken): boolean {
        if (token === null) {
            return true;
        }

        let isExpired = moment(token.expirationDate).utc().isBefore(moment().utc());

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

    private saveToken(token: IToken): void {
        let tokenString = this.buildEncodedToken(token);
        localStorage.setItem(AUTH_KEY, tokenString);
    }
}
