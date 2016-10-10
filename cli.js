#!/usr/bin/env node
'use strict';
const app = require('commander');
const WebSocket = require('ws');

app.version('0.0.1')
    .usage('[options] message')
    .description('Sent messages to WebSocket server using cli.')
    .option('-H, --host <string>', 'WebSocket server host address')
    .parse(process.argv);

if (!app.args.length || !app.host) app.help();
else {
    let ws = new WebSocket(app.host);
    function error(err) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        console.log('Successfully sent');
    }

    ws.on('open', () => {
        ws.send(app.args.join(' '), error);
    });

    ws.on('message', (message) => {
        console.log('Received: %s', message);
        ws.close();
    });

    ws.on('error', error);
}
