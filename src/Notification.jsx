import React, {PropTypes, Component} from 'react';

const Notification = (props) => {
  console.log('Rendering <Notification />');
  return (
    <div className="message system">
      {props.message.content}
    </div>
  )
}

export default Notification;
