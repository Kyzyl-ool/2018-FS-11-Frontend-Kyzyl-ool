import React, { Component } from 'react';
import MessageWindow from './lib/components/MessageWindow/MessageWindow';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Chats from './lib/components/Chats/Chats';
import AuthPage from './lib/components/AuthPage/AuthPage';
import {connect} from 'react-redux';
import * as actionCreators from './store/actions/index';
import Receiver from './lib/components/MessageReceiver/messageReceiver';



class App extends Component {
  constructor(props) {
    super(props);
    this.receiver = Receiver;
    this.receiver.subscribe('1', (m) => {
      if (+localStorage.getItem('userId') !== m.data.user_id)
        this.props.onNewMessage(m);
    })
  }
  componentWillMount() {
    this.props.checkLogin();
  }

  render() {



    let route = (
      <Switch>
        <Route
          path='/authpage'
          component={() => <AuthPage/>}
        />
        <Redirect to='/authpage'/>
      </Switch>
    );

    // console.log('Authorized:', this.props.isAuthorized);
    if (this.props.isAuthorized) {
      route = (
        <Switch>
          <Route exact path='/chats' component={() => <Chats/>}/>
          {
            Object.keys(this.props.chatNames).map(
              ((value) =>
                  <Route
                    key={value}
                    path={`/chats/${value}`}
                    component={() => <MessageWindow id={value} />}
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
    token: state.auth.access_token,
    isAuthorized: state.auth.isAuthorized,
    messages: state.msglist.messages,
  }
};

const mapDispatchTpProps = dispatch => {
  return {
    checkLogin: () => dispatch(actionCreators.authCheck()),
    onNewMessage: (values) => dispatch(actionCreators.onNewMessage(values)),

  }
};

export default connect(mapStateToProps, mapDispatchTpProps)(App);
