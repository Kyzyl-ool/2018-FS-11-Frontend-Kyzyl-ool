import React, { Component } from 'react';
import './MessageList.css';
import Message from './Message/Message';

const mockMessages = [
  [
    {
      text: 'Hello',
      time: new Date().toLocaleTimeString(),
      spanText: 'Delivered',
    },
    {
      text: '#Hello =)',
      time: new Date().toLocaleTimeString(),
      spanText: 'Delivered',
    }
  ],
  [
    {
      text: 'Hi',
      time: new Date().toLocaleTimeString(),
      spanText: 'Delivered',
    },
    {
      text: '#Who are you?',
      time: new Date().toLocaleTimeString(),
      spanText: 'Delivered',
    }
  ],
  [
    {
      text: 'Привет',
      time: new Date().toLocaleTimeString(),
      spanText: 'Delivered',
    },
    {
      text: '#Здарова)',
      time: new Date().toLocaleTimeString(),
      spanText: 'Delivered',
    }
  ],
];

class MessageList extends Component {
    constructor(props) {
      super(props);

      // alert(props.id);
      this.state = {
        messages: mockMessages[props.id]
      };
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
                  this.state.messages.map(
                    (value, index) =>
                      <Message
                        key={index}
                        text={value.text}
                        time={value.time}
                        spanText={value.spanText}
                        file={value.file} />)
              }
            </div>
        );
    }
}

export default MessageList;
