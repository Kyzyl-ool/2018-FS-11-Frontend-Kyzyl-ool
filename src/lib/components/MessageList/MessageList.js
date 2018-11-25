import React, { Component } from 'react';
import './MessageList.css';
import Message from './Message/Message';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';

// const mockMessages = [
//   [
//     {
//       text: 'Hello',
//       time: new Date().toLocaleTimeString(),
//       spanText: 'Delivered',
//     },
//     {
//       text: '#Hello =)',
//       time: new Date().toLocaleTimeString(),
//       spanText: 'Delivered',
//     }
//   ],
//   [
//     {
//       text: 'Hi',
//       time: new Date().toLocaleTimeString(),
//       spanText: 'Delivered',
//     },
//     {
//       text: '#Who are you?',
//       time: new Date().toLocaleTimeString(),
//       spanText: 'Delivered',
//     }
//   ],
//   [
//     {
//       text: 'Привет',
//       time: new Date().toLocaleTimeString(),
//       spanText: 'Delivered',
//     },
//     {
//       text: '#Здарова)',
//       time: new Date().toLocaleTimeString(),
//       spanText: 'Delivered',
//     }
//   ],
// ];

class MessageList extends Component {
    render() {
      if (this.props.messages === undefined)
        return null;
      else
        return (
            <div className="MessageList">
              {
                  this.props.messages.map(
                    (value, index) =>
                      <Message
                        key={index}
                        text={value.text}
                        time={value.time}
                        spanText={value.spanText}
                        file={value.file} />)
              }
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    messages: state.msgform.messages,
  }
};

export default connect(mapStateToProps)(MessageList);
