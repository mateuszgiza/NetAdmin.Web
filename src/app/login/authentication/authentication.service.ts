import { ITokenJson, Token } from '../models/token.model';
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
        let encodedToken = this.signIn(model);
        this.saveToken(encodedToken);
    }

    public logout(): void {
        this.removeToken();
        this.router.navigate(['/login']);
    }

    public get isAuthenticated(): boolean {
        let token = this.tokenModel;
        return token !== null;
    }

    public get currentUser(): string {
        let token = this.tokenModel;
        return token.getTokenData().payload.sub || '';
    }

    private get tokenModel(): IToken {
        let token: IToken = null;
        try {
            token = this.getToken();
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

    private signIn(model: ILoginModel): IToken {
        // Call API to get new token using username/password
        let newToken = null;
        this.saveToken(newToken);

        return newToken;
    }

    private renewToken(token: IToken): void {
        if (token === null) {
            return;
        }

        // Call API to get new token using old token
        let newToken = null;
        this.saveToken(newToken);
    }

    private isTokenExpired(token: IToken): boolean {
        if (token === null) {
            return true;
        }

        let isExpired = moment.unix(token.getTokenData().payload.exp).utc()
            .isBefore(moment().utc());

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
        let tokenString = this.encodeToken(token.getJsonToken());
        localStorage.setItem(AUTH_KEY, tokenString);
    }

    private getToken(): IToken {
        let encodedToken: string = localStorage.getItem(AUTH_KEY) || null;
        if (encodedToken === null ||
            encodedToken.length <= 0) {
            return null;
        }

        return this.decodeToken(encodedToken);
    }

    private encodeToken(token: ITokenJson): string {
        let tokenString = JSON.stringify(token);
        let encodedToken = btoa(tokenString);
        return encodedToken;
    }

    private decodeToken(encodedToken: string): IToken {
        let tokenString: string = atob(encodedToken);
        let tokenJson = <ITokenJson>JSON.parse(tokenString);
        return new Token(tokenJson);
    }
}
