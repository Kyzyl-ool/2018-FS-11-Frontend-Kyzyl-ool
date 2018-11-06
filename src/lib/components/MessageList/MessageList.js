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
          spanText: this.props.msg.spanText,
          file: this.props.msg.file
        });
        return (
            <div className="MessageList">
              {
                  this.state.messages.map(((value, key) => <Message parent={this} key={key} text={value.text} time={value.time} spanText={value.spanText} file={value.file} />))
              }
            </div>
        );
    }
}

export default MessageList;
