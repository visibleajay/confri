import { ConfriActions } from './confri.actions';
import { Action } from 'redux';

export type MESSAGE_STATE_TYPES = 'success' | 'pending' | 'error';

export interface IfcMessage {
	text: String;
	incoming: Boolean;
	sender: String;
	sentAt: Date;
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

export function rootReducer(lastState: IfcConfriState, action: Action): IfcConfriState {
	const newState: IfcConfriState = INITIAL_CONFRI_STATE;
	switch(action.type) {
		case ConfriActions.USERNAME:
			return newState;
		default:
			return newState;
	}
}
