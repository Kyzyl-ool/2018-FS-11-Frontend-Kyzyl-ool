import React, { Component } from 'react';
import MessageWindow from './lib/components/MessageWindow/MessageWindow';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Aux from './hoc/Aux/Aux';
import Chats from './lib/components/Chats/Chats';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [
        {
          chatName: 'Chat1',
        },
        {
          chatName: 'Chat2',
        },
        {
          chatName: 'Chat3',
        }
      ]
    }

  }

  render() {
    return (
      <Router>
        <Aux>
          <Route exact path='/chats' component={() => <Chats chats={this.state.chats}/>}/>
          {
            this.state.chats.map(
              ((value, index) =>
              <Route
                key={index}
                path={`/chats/${index}`}
                component={() => <MessageWindow id={index} />}
              />
              )
            )

          }
        </Aux>
      </Router>
    );
  }

}


export default App;
