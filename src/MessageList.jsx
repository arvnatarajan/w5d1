import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {

  renderMessages () {
    return this.props.messages.map((message) => {
      return message.type === 'postNotification' ? this.renderNotifications(message) : this.renderUserMessage(message);
    });
  }

  renderUserMessage (message) {
    return <Message key={message.id} message={message}/>
  }

  renderNotifications (message) {
    return <Notification key={message.id} message={message}/>
  }

  render () {
    return (
      <div id="message-list">
        {this.renderMessages()}
      </div>
    )
  }
}

export default MessageList;
