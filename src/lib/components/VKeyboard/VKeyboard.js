import React, { Component } from 'react';
import './VKeyboard.css';
import Aux from '../../../hoc/Aux/Aux';
import {connect} from 'react-redux';
import { JUST_SERVER, BACKEND_SERVER } from '../../../config';
import * as actionCreators from '../../../store/actions/index';



class VKeyboard extends Component {
  constructor(props) {
    super(props);

    if (this.props.emojiAmount === 0)
      fetch(BACKEND_SERVER, {
        method: 'POST',
        body: JSON.stringify({
          'jsonrpc': '2.0',
          'method': 'get_emojis_amount',
          'id': 0,
          'params': ['activity']
        })
      })
        .then((response => {
          response.json()
            .then((value =>
            {
              // console.log(value);
              this.props.onEmojiAmountLoaded(value.result);
            }))
        }))
  }

  onEmojiClick(event) {
    // console.log(event.target.src);
    this.props.onEmojiClick(this.props.id, event.target.src);
  }


  render() {
    return (
      <Aux>
        <div className='VKeyboard' hidden={!this.props.isEnabled} >

          {
            Array.from(new Array(this.props.emojiAmount)).map(
              ((value, index) => <div className='emoji' key={index} style={{backgroundPosition: `-${32*(index%2)}px -${32*Math.floor(index/2)}px`}}/>)
            )
          }

        </div>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return  {
    isEnabled: state.msgform.isVKeyboardEnabled,
    emojiAmount: state.vkeyboard.emojiAmount
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onEmojiAmountLoaded: (filenames) => dispatch(actionCreators.onEmojiFilenameLoaded(filenames)),
    onEmojiClick: (id, source) => dispatch(actionCreators.onEmojiClick(id, source)),

  }
};


export default connect(mapStateToProps, mapDispatchToProps)(VKeyboard);
