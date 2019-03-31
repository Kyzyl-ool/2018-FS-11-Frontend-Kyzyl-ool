import React, { Component } from 'react';
import styles from './DialogueElem.module.css';
import {Link} from 'react-router-dom';

class DialogueElem extends Component {
  render() {
    return (
      <div>
        <Link className={styles.DialogueElem} to={`/chats/${this.props.id}`} >
            {this.props.name}
        </Link>
      </div>
    );
  }
}

export default DialogueElem;
