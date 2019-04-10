import React, { useState } from 'react';
import MessageForm from '../message-form/MessageForm';
import MessageList from '../MessageList/MessageList';
import div from '../../../hoc/Aux/Aux';
import VKeyboard from '../VKeyboard/VKeyboard';
import ChatTitle from './ChatTitle/ChatTitle';
import styles from './MessageWindow.module.css';


function MessageWindow(props) {
  const [title, setTitle] = useState(props.title);
    return (
        <div className={styles.MessageWindow}>
          <ChatTitle title={title} />
          <MessageList id={props.id} />
          <MessageForm id={props.id} />
          <VKeyboard id={props.id} />
        </div>
    );
}

export default MessageWindow;
