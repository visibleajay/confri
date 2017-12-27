import {Injectable} from '@angular/core';
import {Action} from 'redux';

@Injectable()
export class ConfriActions {
    static USERNAME = 'USERNAME';
    
    username(): Action {
        return { type: ConfriActions.USERNAME};
    }
}