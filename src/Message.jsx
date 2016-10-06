import React, {PropTypes, Component} from 'react';

const Message = (props) => {
  console.log('Rendering <Message />');
  console.log(props.color);
  return (
    <div className="message">
      <span className="username" style={{color: props.message.userColor}}>{props.message.username}</span>
      <span className="content">{props.message.content}</span>
    </div>
  )
}

export default Message;
