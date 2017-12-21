export class Message {

    id: number;
    user: String;
    text: String;
    sentAt: Date;
    sender: Boolean;

    constructor(_id: number, _user: String, _text: String, _sender: Boolean, _sentAt?: Date) {
        this.id = _id;
        this.user = _user;
        this.text = _text;
        this.sender = _sender;
        this.sentAt = _sentAt || new Date();
    }
}
