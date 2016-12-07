import * as moment from 'moment';

export interface IToken {
    username: string;
    expirationDate: moment.Moment;
}
