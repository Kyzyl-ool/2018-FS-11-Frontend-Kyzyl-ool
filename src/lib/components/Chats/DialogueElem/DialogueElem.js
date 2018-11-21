import React, { Component } from 'react';
import './DialogueElem.css';
import {Link} from 'react-router-dom';


class DialogueElem extends Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.id = props.id;
  }


  render() {
    return (
      <div>
        <Link className="DialogueElem" to={`/chats/${this.id}`} >
            {this.name}
        </Link>
      </div>
    );
  }
}

export default DialogueElem;
