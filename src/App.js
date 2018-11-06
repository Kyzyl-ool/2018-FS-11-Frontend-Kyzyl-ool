import React, { Component } from 'react';
import './App.css';
import MessageForm from './lib/components/message-form/MessageForm';
import MessageList from './lib/components/MessageList/MessageList';


class App extends Component {
  constructor(props) {
    super(props);
    this.handleNewMessage = this.handleNewMessage.bind(this);
  }

  handleNewMessage(event) {
    alert("HIHI");
    event.preventDefault();

  }


  render() {
    return (
        <div>
          <MessageList />
          <MessageForm onSubmit={this.handleNewMessage} />
        </div>
    );
  }
}

export default App;
