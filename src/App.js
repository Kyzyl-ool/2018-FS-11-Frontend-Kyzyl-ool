import React, { Component } from 'react';
import MessageWindow from './lib/components/MessageWindow/MessageWindow';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Aux from './hoc/Aux/Aux';
import Chats from './lib/components/Chats/Chats';
import AuthPage from './lib/components/AuthPage/AuthPage';
import {connect} from 'react-redux';
import * as actionCreators from './store/actions/index';


class App extends Component {
  componentDidMount() {
    this.props.checkLogin();
  }

  render() {
    let route = (
      <Switch>
        <Route
          path='/auth'
          component={() => <AuthPage/>}
        />
        <Redirect to='/auth'/>
      </Switch>
    );

    if (this.props.token) {
      route = (
        <Switch>
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
          <Redirect to='/chats'/>
        </Switch>
      )
    }
    return (
      <Router>
        {route}
      </Router>
    );
  }

}

const mapStateToProps = state => {
  return {
    chatNames: state.chatslist.chatNames,
    amountOfUnreadMessages: state.chatslist.amountOfUnreadMessages,
    token: state.auth.token,
  }
};

const mapDispatchTpProps = dispatch => {
  return {
    checkLogin: () => dispatch(actionCreators.authCheck())
  }
};

export default connect(mapStateToProps, mapDispatchTpProps)(App);
