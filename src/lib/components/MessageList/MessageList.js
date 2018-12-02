import React, { Component } from 'react';
import './MessageList.css';
import Message from './Message/Message';
import {connect} from 'react-redux';


class MessageList extends Component {
    render() {
      return (
            <div className="MessageList">
              {
                  this.props.messages[this.props.id].map(
                    (value, index) =>
                      <Message
                        key={index}
                        text={value.text}
                        time={value.time}
                        spanText={value.spanText}
                        file={value.file}
                        user_id={value.user_id}
                      />)
              }
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    messages: state.msglist.messages,
  }
};

export default connect(mapStateToProps)(MessageList);
