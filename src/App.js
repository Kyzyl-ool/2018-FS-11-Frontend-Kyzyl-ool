import React, { Component } from 'react';
import './App.css';
import MessageForm from './lib/components/message-form/MessageForm';
import MessageList from './lib/components/MessageList/MessageList';


class App extends Component {
  constructor(props) {
    super(props);
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.state = {
      msg: {}
    }
  }

  handleNewMessage(value) {
    // alert(value);
    // let tmp = this.state.messages;
    var newMessage = {
      text: value.text,
      time: new Date().toLocaleTimeString(),
      status: false,
      file: value.file
    };
    this.setState({msg: newMessage});
  }





  render() {
    return (
        <div>
          <MessageList msg={this.state.msg}/>
          <MessageForm dispatcher={this.handleNewMessage.bind(this)} />
        </div>
    );
  }
}

export default App;
