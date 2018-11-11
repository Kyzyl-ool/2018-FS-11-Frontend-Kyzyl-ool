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
      <Link to={`/chats/${this.id}`} >
        <div className="DialogueElem">
          {this.name}
        </div>
      </Link>
    );
  }
}

export default DialogueElem;
