import React, { Component } from 'react';
import './App.css';
import MessageForm from './lib/components/message-form/MessageForm';
import MessageList from './lib/components/message-list/MessageList';


class App extends Component {
  render() {
    return (
        <div>
            <MessageList></MessageList>
            <MessageForm></MessageForm>
        </div>
    );
  }
}

export default App;
