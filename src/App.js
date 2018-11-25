import React, { Component } from 'react';
import MessageWindow from './lib/components/MessageWindow/MessageWindow';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Aux from './hoc/Aux/Aux';
import Chats from './lib/components/Chats/Chats';
import {connect} from 'react-redux';


class App extends Component {
  render() {
    return (
      <Router>
        <Aux>
          <Route exact path='/chats' component={() => <Chats chats={this.props.chatNames}/>}/>
          {
            this.props.chatNames.map(
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

const mapStateToProps = state => {
  return {
    chatNames: state.chatslist.chatNames,
    amountOfUnreadMessages: state.chatslist.amountOfUnreadMessages
  }
};

export default connect(mapStateToProps)(App);
