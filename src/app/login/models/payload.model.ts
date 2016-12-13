import * as moment from 'moment';

export interface IPayload {
    sub: string;
    jti: string;
    iat: number;
    nbf: number;
    exp: number;
    iss: string;
    aud: string;
}
