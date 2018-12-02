import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import './Chats.css';
import DialogueElem from './DialogueElem/DialogueElem';
import {connect}  from 'react-redux';
import * as actionCreators from '../../../store/actions/index';

class Chats extends Component {
  componentWillMount () {
    if (this.props.needToUpdate) {
      this.props.onLoadChatNames();
      this.props.onGetUserData();
      this.props.onGetMessages();
    }

  }

  static onExit() {
    localStorage.clear();
    window.location.reload();
  }

  render() {
    return (
      <Aux>
        {
          Object.keys(this.props.chatNames).map(((value) =>
          <DialogueElem
            key={value}
            name={this.props.chatNames[value]}
            id={value}
          />))
        }
        <div className='ProfileDiv'>
          You entered as {this.props.user_first_name} {this.props.user_last_name}
        </div>
        <div className='ExitButton' onClick={Chats.onExit}>
          Exit
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    chatNames: state.chatslist.chatNames,
    amountOfUnreadMessages: state.chatslist.amountOfUnreadMessages,
    needToUpdate: state.chatslist.needToUpdate,
    user_first_name: state.user.user_first_name,
    user_last_name: state.user.user_last_name
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadChatNames: () => dispatch(actionCreators.onLoadChatNames()),
    onGetUserData: () => dispatch(actionCreators.onGetUserData()),
    onGetMessages: () => dispatch(actionCreators.onLoadMessages()),

  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Chats);
