import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  private url = 'http://localhost:5000';
  private socket;
  
  // send message to the server.
  sendMessage(payload, callback ){
    this.socket.emit('add-message', payload, (result) => {
      callback(result.message);      
    });
  }
  
  // receive message from the server.
  // create an observable which would get triggered when a message is encountered
  // from the server.
  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })   
    return observable;
  }  
}