const WebSocket = require('ws');

const ws = new WebSocket.Server({ port: 8080 });

ws.on('connection', (webSocket) => {
   webSocket.on('message', (message) => {
    console.log('received: ', message);
   }); 
   webSocket.send('something');
});