import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { NgRedux } from '@angular-redux/store'
import { IfcMessage, MESSAGE_STATE_TYPES, IfcConfriState } from './confri.state';
import { ChatService } from '../service/chat.service';

@Injectable()
export class ConfriActions {
	static USERNAME = 'USERNAME';
	static ADD_MESSAGE = 'ADD_MESSAGE';
	static SENT_MESSAGE = 'SENT_MESSAGE';
	static UPDATE_MESSAGE_STATE = 'UPDATE_MESSAGE_STATE';
	static COUNTER = 0;

	constructor(private ngRedux: NgRedux<IfcConfriState>, 
							private chatService: ChatService) {
								this.chatService.getMessages()
										.subscribe(this.receiveMessage);
							}

	username(name: string) {
		return { 
			type: ConfriActions.USERNAME,
			username: name
		};
	}

	addMessage(message: IfcMessage) {
		return {
			type: ConfriActions.ADD_MESSAGE,
			message
		}
	}

	updateMessageState(data) {
		return {
			type: ConfriActions.UPDATE_MESSAGE_STATE,
			payload: {
				id: data.id,
				state: data.state
			}
		}
	}


	postMessage(payload) {
		this.ngRedux.dispatch(this.addMessage(payload));
	// TODO:- Add middleware.
		this.chatService.sendMessage(
							{
								text: payload.text, 
								username: payload.username
							}, 
							this.ngRedux.dispatch(this.updateMessageState({id: payload.id, state: 'success'})),
							this.ngRedux.dispatch(this.updateMessageState({id: payload.id, state: 'error'}))
					);
	}

	receiveMessage = (response) => {
		// receive message from the server and 
		// add it to the messageList
		// with state as success.
		console.log(response);
		this.ngRedux.dispatch(this.addMessage({
				id: ConfriActions.COUNTER++,
				text: response.message || 'You want to say more',
				time: new Date(),
				incoming: true,
				sender: response.username || 'Friend',
				state: 'success'
			}));
	}  
}