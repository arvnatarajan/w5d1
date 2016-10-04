import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

let data = {
  currentUser: {name: "Steve"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: []
};


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      data: data
    }
  }

  componentDidMount () {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:4000", ["JSON"]);
    console.log('Connected to server');

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      this.state.data.messages.push({id: 3, username: "Michelle", content: "Hello there!"});
      // Update the state of the app component. This will call render()
      this.setState({data: this.state.data})
    }, 3000);
  }

  updateAppWithMessage (content, newID, username) {
    this.socket.send(JSON.stringify({
      username: username,
      content: content
    }));

    data.messages.push({
      id: newID,
      username: username,
      content: content
    });


    this.setState({
        data: data
        })
  }

  render () {
    console.log('Rendering <App />');
    return (
      <div className="wrapper">
        <nav>
          <h1>speakeasy</h1>
        </nav>
        <MessageList messages={this.state.data.messages} />
        <ChatBar
          updateAppWithMessage={this.updateAppWithMessage.bind(this)}  currentUser={this.state.data.currentUser}
        />
      </div>
    )
  }
}

export default App;
