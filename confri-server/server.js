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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/receive', (req,res) => {
    res.send({'challenge': req['body']['challenge']});
    io.emit('message', { type: 'new-message', text: req['body']['event']['text'] });
});


io.on('connection', (socket) => {

    console.log('user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('add-message', (message) => {
        console.log('add message');
        webhook.send(message, function(err, header, statusCode, body) {
            if (err) {
              console.log('Error:', err);
            } else {
              console.log('Received', statusCode, 'from Slack');
            }
        });
        io.emit('message', { type: 'new-message', text: message });
    });
});

http.listen(5000, () => {
    console.log('Server started on port 5000');
});