import React, { Component } from 'react';
import MessageForm from '../message-form/MessageForm';
import MessageList from '../MessageList/MessageList';
import Aux from '../../../hoc/Aux/Aux';


class MessageWindow extends Component {
    render() {
    return (
        <Aux>
          <MessageList id={this.props.id}  />
          <MessageForm id={this.props.id} />
        </Aux>
    );
  }
}

export default  MessageWindow;
