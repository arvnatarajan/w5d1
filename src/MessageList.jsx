import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {

  renderMessages () {
    return this.props.messages.map((message) => {
      return <Message key={message.id} message={message}/>
    })
  }

  render () {
    return (
      <div id="message-list">
        {this.renderMessages()}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </div>
    )
  }
}

export default MessageList;
