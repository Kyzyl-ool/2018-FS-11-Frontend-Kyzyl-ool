import React, { Component } from 'react';
import './DialogueElem.css';
import {Link} from 'react-router-dom';


class DialogueElem extends Component {
  render() {
    return (
      <div>
        <Link className="DialogueElem" to={`/chats/${this.props.id}`} >
            {this.props.name}
        </Link>
      </div>
    );
  }
}

export default DialogueElem;
