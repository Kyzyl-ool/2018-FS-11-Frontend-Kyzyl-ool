import React, {useState} from 'react';
import styles from './ChatTitle.module.css';

function ChatTitle(props) {
  let [title, setTitle] = useState(props.title);


  return (
    <div className={styles.ChatTitle}>
      {title}
    </div>
  )
}

export default ChatTitle;
