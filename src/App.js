import React, { Component } from 'react';
import MessageWindow from './lib/components/MessageWindow/MessageWindow';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Aux from './hoc/Aux/Aux';
import Chats from './lib/components/Chats/Chats';

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Router>
        <Aux>
          <Route path='/' component={() => <Chats/>}/>
          <Route path='/chat' component={() => <MessageWindow/>}/>
        </Aux>
      </Router>
    );
  }

}


export default App;
