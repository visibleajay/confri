import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Message } from '../model/message.model';

const initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessagesService {

  // add a new message to the message list once.
  newMessages: Subject<Message> = new Subject<Message>();

  // keep track of all the messages.
  messages: Observable<Message[]>;

  updates: Subject<any> = new Subject<any>();

  // action streams by creating an operation for each message.
  create: Subject<Message> = new Subject<Message>();

  constructor() {
    this.messages = this.updates.scan((messages: Message[],
             operation: IMessagesOperation) => {
               return operation(messages);
             },
            initialMessages)
      // it makes available the updated list of messages to the anybody
      // who subscribes it.
      // publishReplay helps in caching that list of messages.
      .publishReplay(1)
      .refCount();

    this.create
      .map( function(message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          return messages.concat(message);
        };
      })
      .subscribe(this.updates);

    this.newMessages
      .subscribe(this.create);

  }

  // add every new message to the messages list
  addMessage(message: Message): void {
    this.newMessages.next(message);
  }
}
