import React, { Component } from 'react';
import  './Message.css';

class Message extends Component {
  constructor(props) {
      if (props.text === undefined || props.text === '') {
        super(props);
        this.hidden = true;
      }
      else {
        super(props);
        this.text = props.text;
        this.time = props.time;
        this.status = props.status;
        this.file = props.file;
      }
  }

  attachment(value) {
    if (value === undefined) {
      return <span></span>;
    }
    if (value.type.startsWith('image')) {
      let url = URL.createObjectURL(value);
      URL.revokeObjectURL(url);
      return <img alt="attach" className="AttachedImage" src={url}/>;
    }
    else {
      let url = URL.createObjectURL(value);
      URL.revokeObjectURL(url);
      return <a href={url}>Attachment</a>;
    }
  }

  setSuccess() {
    this.status = true;
  }


  render() {
        return (
            <div className="Message" hidden={this.hidden}>
              {this.attachment(this.file)}
              <p>{this.text}</p>
              <time className="TimeLabel">{this.time}</time>
              <span className="StatusLabel"> {this.status ? 'Delivered' : 'Sending...'} </span>
            </div>
        );
    }
}

export default Message;
