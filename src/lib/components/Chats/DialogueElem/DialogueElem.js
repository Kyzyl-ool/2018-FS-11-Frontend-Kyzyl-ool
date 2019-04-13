import React, { useState, useEffect } from 'react';
import styles from './DialogueElem.module.css';
import {Link} from 'react-router-dom';
import Cross from './Cross';

function DialogueElem (props) {
  const [name, setName] = useState(props.name);
  const [id, setId] = useState(props.id);

    return (
      <div>
        <Link className={styles.DialogueElem} to={`/chats/${id}`} >
            {name} <Cross name={name} />
        </Link>
      </div>
    );
}

export default DialogueElem;
