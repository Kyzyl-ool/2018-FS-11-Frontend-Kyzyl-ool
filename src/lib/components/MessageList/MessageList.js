import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './MessageList.module.css';
import Message from './Message/Message';
import {connect} from 'react-redux';


class MessageList extends Component {

  scrollToBottom = () => {
    const messagesContainer = ReactDOM.findDOMNode(this);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  componentDidMount() {
    this.scrollToBottom();
  }
    render() {

      const { messages } = this.props;

      return (
            <div className= {styles.MessageList}>
              {
                messages[this.props.id] && messages[this.props.id].map(
                    (value, index) =>
                      <Message
                        key={index}
                        text={value.text}
                        time={value.time}
                        spanText={value.spanText}
                        user_id={value.user_id}
                        filename={value.filename}
                        filetype={value.filetype}
                        filesize={value.filesize}
                        file={value.file}
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
