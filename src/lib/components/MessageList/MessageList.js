import React, { Component } from 'react';
import './MessageList.css';
import Message from './Message/Message';

class MessageList extends Component {
    constructor(props) {
      super(props);
      this.messages = props.messages;
    }

    render() {
        return (
            <div className="MessageList">
              {
                  this.messages.map((value) =>
                  <Message text={value.text} time={value.time} status={value.status} />
                  )
              }
            </div>
        );
    }
}

export default MessageList;
