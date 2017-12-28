import { ConfriActions } from './confri.actions';
import { Action } from 'redux';

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

export const INITIAL_CONFRI_STATE: IfcConfriState = {
	username: '',
	messageList: []
}

export function rootReducer(lastState: IfcConfriState, action): IfcConfriState {
	const newState: IfcConfriState = INITIAL_CONFRI_STATE;
	switch(action.type) {
		case ConfriActions.USERNAME:
			return {
				...lastState,
				username: action.username
			};
		case ConfriActions.ADD_MESSAGE:
			return {
				username: lastState.username,
				messageList: [...lastState.messageList, action.message]	
			};
		case ConfriActions.UPDATE_MESSAGE_STATE:
			return {
				...lastState,
				messageList: lastState.messageList.map( (message) =>{
					if ( message.id === action.payload.id ) {
						message['state'] = action.payload.state;
					}
					return message;
				})
			};
		default:
			return newState;
	}
}
