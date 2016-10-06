import React, {PropTypes, Component} from 'react';

const MessageImage = (props) => {
  console.log('Rendering <MessageImage />');
  return (
    <div className="message">
      <span className="username" style={{color: props.message.userColor}}>{props.message.username}</span>
      <span className="content">
        <img className="image" src={props.message.content} />
      </span>
    </div>
  )
}

export default MessageImage;
