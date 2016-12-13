import { IHeader, IPayload, ITokenJson } from './';
import * as moment from 'moment';

export interface ITokenData {
    header: IHeader;
    payload: IPayload;
    signature: string;
}

export class TokenData implements ITokenData {
    public header: IHeader;
    public payload: IPayload;
    public signature: string;

    constructor(
        private jsonToken: ITokenJson
    ) { 
        this.extractJson();
    }

    private extractJson(): void {
        let parts = this.jsonToken.access_token.split('.');

        this.header = this.extractHeader(parts[0]);
        this.payload = this.extractPayload(parts[1]);
        this.signature = parts[2];
    }

    private extractHeader(hash: string): IHeader {
        let headerJson = atob(hash);
        let header = JSON.parse(headerJson);
        return <IHeader>header;
    }

    private extractPayload(hash: string): IPayload {
        let payloadJson = atob(hash);
        let payload = JSON.parse(payloadJson);
        return <IPayload>payload;
    }
}
