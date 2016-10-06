// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

let clients = {};
let numUsers;
let colors = ['blue', 'green', 'red', 'grey'];
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  let numUsersMessage = {
    type: 'serverUserCount',
    numUsers: wss.clients.length
  }

  console.log('Client connected');
  console.log(numUsersMessage.numUsers);

  clients[ws] = ''

  wss.broadcast(JSON.stringify(numUsersMessage));

  let colorPicked = Math.floor(Math.random() * 4) + 1
  ws.send(JSON.stringify({
    type: 'colorChoice',
    color: colors[colorPicked]
  }))

  ws.on('message', function incoming(message) {
    let userMessage = JSON.parse(message);
    switch(userMessage.type) {
      case "postMessage":
        console.log(`User ${userMessage.username} said ${userMessage.content}`);
        break;
      case "postNotification":
        clients[ws] = userMessage.username;
        break;
      default:
      // show an error in the console if the message type is unknown
      throw new Error("Unknown event type " + userMessage.type);
    }

    userMessage.id = uuid.v4();
    console.log(userMessage)
    wss.broadcast(JSON.stringify(userMessage));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    numUsers = wss.clients.length;
    let disconnectMessage = {
      type: 'postNotification',
      numUsers: numUsers,
      content: `${clients[ws]} has left the session`
    }
    let numUsersMessage = {
      type: 'serverUserCount',
      numUsers: wss.clients.length
    }
    wss.broadcast(JSON.stringify(disconnectMessage));
    wss.broadcast(JSON.stringify(numUsersMessage));
    console.log('Client disconnected');
  });
});
