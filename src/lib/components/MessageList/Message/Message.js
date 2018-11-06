import React, { Component } from 'react';
import  './Message.css';

class Message extends Component {
  constructor(props) {
    super(props);
    this.text = props.text;
    this.time = props.time;
    this.status = props.status;
  }


  render() {
        return (
            <div className="Message">
              <p>{this.text}</p>
              <time className="TimeLabel">{this.time}</time>
              <span className="StatusLabel"> {this.status ? 'Delivered' : 'Sending...'} </span>
            </div>
        );
    }
}

export default Message;
