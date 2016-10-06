import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      numUsers: 0,
      myColor: 'black'
    }
  }

  handleMessage(event) {
    const data = JSON.parse(event.data);
    if(data.userColor) {}
    let messages = [
      ...this.state.messages,
      {
        type: data.type,
        id: data.id,
        username: data.username,
        content: data.content,
        userColor: data.userColor
      }
    ];
    this.setState({messages})
  }

  displayUsers(event) {
    const data = JSON.parse(event.data).numUsers;
    this.setState({
      numUsers: data
    });
  }

  setColor(event) {
    const color = JSON.parse(event.data).color;
    console.log(color);
    this.setState({
      myColor: color
    })
  }

  componentDidMount () {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:4000", ["JSON"]);

    this.socket.onopen = (event) => {
      console.log('Connected to server');

      this.socket.send(JSON.stringify({
        type: 'postNotification',
        username: this.state.currentUser.name,
        content: `${this.state.currentUser.name} has joined the session`
      }));

      this.socket.onmessage = (event) => {
        switch(JSON.parse(event.data).type) {
          case "postMessage":
            this.handleMessage(event)
            break;
          case "postNotification":
            this.handleMessage(event)
            break;
          case "serverUserCount":
            this.displayUsers(event)
            break;
          case "colorChoice":
            this.setColor(event)
            break;
          default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + JSON.parse(event.data).type);
        }
      }
    }

    this.socket.onclose = (event) => {
      console.log('Disconnected from server');
    }
  }

  sendMessageToServer (content, username) {
    this.socket.send(JSON.stringify({
      type: 'postMessage',
      username: username,
      content: content,
      userColor: this.state.myColor
    }));
  }

  sendNameToServer (username) {
    this.socket.send(JSON.stringify({
      type: 'postNotification',
      username: username,
      content: `${this.state.currentUser.name} has changed their name to ${username}`
    }));
    this.updateAppWithCurrentUser(username)
  }

  updateAppWithCurrentUser(username) {
    this.setState({
      currentUser: {name: username}
    });
  }

  render () {
    console.log('Rendering <App />');
    return (
      <div className="wrapper">
        <nav>
          <h1>speakeasy</h1>
          <p>{this.state.numUsers} users online</p>
        </nav>
        <MessageList
          messages={this.state.messages}
        />
        <ChatBar
          sendMessageToServer={this.sendMessageToServer.bind(this)}
          sendNameToServer={this.sendNameToServer.bind(this)}
          updateAppWithCurrentUser={this.updateAppWithCurrentUser.bind(this)}
          currentUser={this.state.currentUser}
        />
      </div>
    )
  }
}

export default App;
