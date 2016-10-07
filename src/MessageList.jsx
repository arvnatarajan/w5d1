import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageImage from './MessageImage.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {

  renderMessages () {
    return this.props.messages.map((message) => {
      switch(message.type) {
        case 'postMessage':
          return <Message key={message.id} message={message}/>
          break;
        case 'postImage':
          return <MessageImage key={message.id} message={message}/>
          break;
        case 'postNotification':
          return <Notification key={message.id} message={message}/>
          break;
        default:
          console.log('uh oh... no message type received!');
      }
    });
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
