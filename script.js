const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();
const server = https.createServer({
  key: fs.readFileSync('/path/to/your/ssl/key.pem'),
  cert: fs.readFileSync('/path/to/your/ssl/cert.pem')
}, app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log('Received:', message);
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(9001, () => {
  console.log('WebSocket server is running on port 9001');
});
