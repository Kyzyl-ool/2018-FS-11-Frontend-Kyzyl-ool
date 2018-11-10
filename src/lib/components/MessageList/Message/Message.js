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
        this.spanText = props.spanText;
        this.file = props.file;

        if (this.text.startsWith('#')) {
          this.notYour = true;
        }
      }
  }

  attachment(value) {
    if (value === undefined) {
      return <span></span>;
    }
    if (value.type.startsWith('image')) {
      let url = URL.createObjectURL(value);
      // URL.revokeObjectURL(url);
      return <img alt="attach" className="AttachedImage" src={url}/>;
    }
    else {
      let url = URL.createObjectURL(value);
      // URL.revokeObjectURL(url);
      return <a href={url}>Attachment</a>;
    }
  }

  render() {
    if (this.hidden) {
      return null;
    }
    else {
      return (
        <div className={this.notYour ? "notYourMessage Message" : "Message"} hidden={this.hidden}>
          {this.attachment(this.file)}
          <p>{this.text}</p>
          <time className="TimeLabel">{this.time}</time>
          <span className="StatusLabel"> {this.spanText} </span>
        </div>
      );
    }
    }
}

export default Message;
