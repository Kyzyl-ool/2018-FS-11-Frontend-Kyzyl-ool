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
        this.filename = props.filename;
        this.filetype = props.filetype;
        this.filesize = props.filesize;
        this.file = props.file;
        this.user_id = props.user_id;
        this.notYour = this.user_id !== +localStorage.getItem('userId');
      }

    if (this.filename) {
      // console.log(this.filename);
      // console.log(this.props.file);
    }

  }

  attachment(value) {
    if (value === undefined) {
      return null;
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
      if (!this.filename)
      return (
        <div className={this.notYour ? "LeftMessageAttributes Message" : "Message"} hidden={this.hidden}>
          {this.attachment(this.file)}
          <p>{this.text}</p>
          <time className="TimeLabel">{this.time}</time>
          <span className="StatusLabel"> {this.spanText} </span>
          <span className='Who'>
            From {this.user_id}
          </span>
        </div>
      );
      else
        return (
          <div className={this.notYour ? "LeftMessageAttributes Message" : "Message"} hidden={this.hidden}>
            {this.attachment(this.file)}
            <p>{this.text}</p>
            <time className="TimeLabel">{this.time}</time>
            <span className="StatusLabel"> {this.spanText} </span>
            <span className='Who'>
            From {this.user_id}
            Size: {this.filesize}
          </span>
          </div>
        );
    }
    }
}

export default Message;
