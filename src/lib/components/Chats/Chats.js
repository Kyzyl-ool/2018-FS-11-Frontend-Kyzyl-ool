import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import './Chats.css';
import DialogueElem from './DialogueElem/DialogueElem';
import {connect}  from 'react-redux';
import * as actionCreators from '../../../store/actions/index';

class Chats extends Component {
  componentWillMount() {
    if (this.props.needToUpdate) {
      this.props.onGetChatsList(localStorage.getItem('access_token'), localStorage.getItem('userId'));
    }
  }

  onExit() {
    localStorage.clear();
    window.location.reload();
  }

  render() {
    return (
      <Aux>
        {
          this.props.chatNames.map(((value, index) =>
          <DialogueElem
            key={index}
            name={value}
            id={index}
          />))
        }
        <div className='ProfileDiv'>
          You entered as {localStorage.getItem('userName')} {localStorage.getItem('userName2')}
        </div>
        <div className='ExitButton' onClick={this.onExit}>
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
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onGetChatsList: (access_token, userId) => dispatch(actionCreators.onGetChatsList(access_token, userId)),

  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Chats);
