import React, { Component } from 'react';
import MessageForm from '../message-form/MessageForm';
import MessageList from '../MessageList/MessageList';
import Aux from '../../../hoc/Aux/Aux';


class MessageWindow extends Component {
  constructor(props) {
    super(props);
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.state = {
      msg: {}
    };
  }

  handleNewMessage(value) {
    // alert(value);
    // let tmp = this.state.messages;
    var newMessage = {
      text: value.text,
      time: new Date().toLocaleTimeString(),
      spanText: 'Sending...',
      file: value.file
    };

    fetch('http://localhost:8081/message',
      {
        method: 'POST',
        body: newMessage
      }).then(
      (event) => {
        if (event.status === 200) {
          newMessage.spanText = 'Delivered';
          this.setState({msg: newMessage});
        }
      },
      (event) => {
        newMessage.spanText = 'ERROR';
        this.setState({msg: newMessage});
      }
    );


  }


  render() {
    return (
        <Aux>
          <MessageList id={this.props.id} msg={this.state.msg} />
          <MessageForm id={this.props.id} dispatcher={this.handleNewMessage.bind(this)} />
        </Aux>
    );
  }
}

export default MessageWindow;
