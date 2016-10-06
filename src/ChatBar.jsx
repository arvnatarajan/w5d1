import React, {Component} from 'react';

class ChatBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleContentInput (event) {
    if(event.keyCode === 13) {
      this.props.sendMessageToServer(event.target.value, this.props.currentUser.name);
      event.target.value = '';
    }
  }

  handleNameChange (event) {
    if(event.keyCode === 13) {
      this.props.sendNameToServer(event.target.value);
    }
  }

  render () {
    console.log('Rendering <ChatBar />');
    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Type your name and hit ENTER"
          onKeyUp={this.handleNameChange.bind(this)}
        />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          onKeyUp={this.handleContentInput.bind(this)}
        />
      </footer>
    )
  }
}

export default ChatBar;
