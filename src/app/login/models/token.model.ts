import { TokenData } from './tokenData.model';
import { ITokenData } from './';

export interface ITokenJson {
    access_token: string;
    expires_in: number;
}

export interface IToken {
    getTokenData: () => ITokenData;
    getJsonToken: () => ITokenJson;
}

export class Token implements IToken {
    private tokenData: ITokenData;

    constructor(
        private jsonToken: ITokenJson
    ) { 
        this.tokenData = new TokenData(jsonToken);
    }

    public getJsonToken() {
        return this.jsonToken;
    }

    public getTokenData() {
        return this.tokenData;
    }
}
