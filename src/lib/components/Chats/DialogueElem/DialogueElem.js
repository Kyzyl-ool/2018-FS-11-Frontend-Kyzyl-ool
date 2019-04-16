import React, { useState} from 'react';
import styles from './DialogueElem.module.css';
import {Link} from 'react-router-dom';
import Cross from './Cross';

function DialogueElem (props) {
  const [name] = useState(props.name);
  const [id] = useState(props.id);

    return (
      <div>
        <Link className={styles.DialogueElem} to={`/chats/${id}`} >
            {name} <Cross name={name} />
        </Link>
      </div>
    );
}

export default DialogueElem;
