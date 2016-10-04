import React, {Component} from 'react';

let newID = 4;
let username = 'Anony';

class ChatBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleContentInput (event) {
    if(event.keyCode === 13) {
      this.props.updateAppWithMessage(event.target.value, newID, this.props.currentUser.name);
      newID++;
      event.target.value = '';
    }
  }

  render () {
    console.log('Rendering <ChatBar />');
    return (
      <footer>
        <input
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          value={this.props.currentUser.name}
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
