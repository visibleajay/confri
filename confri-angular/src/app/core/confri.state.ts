import { ConfriActions } from './confri.actions';
import { Action } from 'redux';
import * as Immutable from 'immutable';

export type MESSAGE_STATE_TYPES = 'success' | 'pending' | 'error';

export interface IfcMessage {
	id: number;
	text: String;
	incoming: Boolean;
	sender: String;
	time: Date;
	state: MESSAGE_STATE_TYPES;
}

export interface IfcConfriState {
	username: String;
	messageList: Array<IfcMessage>;
}

export const INITIAL_CONFRI_STATE: IfcConfriState = Immutable.fromJS({
	username: '',
	messageList: []
} as IfcConfriState)

export function rootReducer(lastState, action): IfcConfriState {
	const newState: IfcConfriState = INITIAL_CONFRI_STATE;
	switch(action.type) {
		case ConfriActions.USERNAME:
			return lastState.set('username', action.username);
		case ConfriActions.ADD_MESSAGE:
			return lastState.updateIn(['messageList'], messageList => messageList.push(action.message));
		case ConfriActions.UPDATE_MESSAGE_STATE:
			return lastState.updateIn(['messageList'], list =>  list.map( (message) => {
						if ( message.id === action.payload.id){
							message['state'] = action.payload.state
						}
						return message;
					}));
		default:
			return newState;
	}
}
