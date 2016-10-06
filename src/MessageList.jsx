import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageImage from './MessageImage.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {

  renderMessages () {
    return this.props.messages.map((message) => {
      switch(message.type) {
        case 'postMessage':
          return this.renderUserMessage(message);
          break;
        case 'postImage':
          return this.renderUserImage(message);
          break;
        case 'postNotification':
          return this.renderNotification(message)
          break;
        default:
          console.log('uh oh... no message type received!');
      }
    });
  }

  renderUserMessage (message) {
    return <Message key={message.id} message={message}/>
  }

  renderUserImage (message) {
    return <MessageImage key={message.id} message={message}/>
  }

  renderNotification (message) {
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
