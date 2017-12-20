'use strict';

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const IncomingWebhook = require('@slack/client').IncomingWebhook;
const request = require('request');

const URL = process.env.MYWEBHOOKURL;
const webhook = new IncomingWebhook(URL);

const USERNAME = 'LiveRock';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/slack/receive', (req,res) => {
    if(req['body']['event'] && req['body']['event']['text'] && !req['body']['event']['subtype']) {
        console.log('Sending message to backend');
        io.emit('message', { username: USERNAME, message: req['body']['event']['text'] });
    }
    res.send({'challenge': req['body']['challenge']});
});


io.on('connection', (socket) => {

    console.log('user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('add-message', (message) => {
        //  Build JSON to send to slack
        const PAYLOAD = {
            'attachments' : [
                {
                    "color" : '#eaefb1',
                    "title"	: message['username'],
                    "text"	: message['text']
                }
            ]
        }
        webhook.send(PAYLOAD, function(err, header, statusCode, body) {
            if (err) {
              console.log('Error:', err);
            } else {
              console.log('Received', statusCode, 'from Slack');
            }
        });
    });
});

http.listen(5000, () => {
    console.log('Server started on port 5000');
});