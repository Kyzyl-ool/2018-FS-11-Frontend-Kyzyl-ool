import React, { Component } from 'react';
import './MessageList.css';
import Message from './Message/Message';

class MessageList extends Component {
    constructor(props) {
      super(props);
      this.state = {
          messages: []
      }
    }




    render() {
        this.state.messages.push({
          text: this.props.msg.text,
          time: this.props.msg.time,
          status: this.props.msg.status
        });
        return (
            <div className="MessageList">
              {
                  this.state.messages.map(((value, key) => <Message key={key} text={value.text} time={value.time} status={value.status} />))
              }
            </div>
        );
    }
}

export default MessageList;
