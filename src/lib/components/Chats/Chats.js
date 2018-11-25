import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import './Chats.css';
import DialogueElem from './DialogueElem/DialogueElem';


class Chats extends Component {
  constructor(props) {
    super(props);

    this.chats = props.chats;


  }

  render() {
    return (
      <Aux>
        {
          this.chats.map(((value, index) =>
          <DialogueElem
            key={index}
            name={value}
            id={index}
          />))
        }
      </Aux>
    );
  }
}

export default Chats;
