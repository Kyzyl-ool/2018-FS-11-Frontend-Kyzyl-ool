import React, { Component } from 'react';
import './VKeyboard.css';
import Aux from '../../../hoc/Aux/Aux';
import {connect} from 'react-redux';
import { JUST_SERVER, BACKEND_SERVER } from '../../../config';
import * as actionCreators from '../../../store/actions/index';

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}


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
    this.props.onToggleVKeyboard(this.props.id);

    fetch(BACKEND_SERVER, {
      method: 'POST',
      body: JSON.stringify({
        'jsonrpc': '2.0',
        'method': 'get_emoji_file',
        'id': 0,
        'params': [+event.target.id]
      })
    })
      .then((response) => {
        response.json()
          .then((value =>
          {
            const blob = b64toBlob(value.result.file, 'image/png', 512);
            blob.name = value.result.name;
            this.props.onSubmit(this.props.id, ' ', new Date().toLocaleTimeString(), 'Emoji', blob);
            // this.props.onSendFile(this.props.id, blob);
          }))
      })

  }


  render() {
    return (
      <Aux>
        <div className='VKeyboard' hidden={!this.props.isEnabled} >

          {
            Array.from(new Array(this.props.emojiAmount)).map(
              ((value, index) => <div id={index} onClick={(event) => this.onEmojiClick(event)} className='emoji' key={index} style={{backgroundPosition: `-${32*(index%2)}px -${32*Math.floor(index/2)}px`}}/>)
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
    onToggleVKeyboard: (id) => dispatch(actionCreators.messageFormToggleVKeyboard(id)),
    onSubmit: (id, text, time, spanText, file) => dispatch(actionCreators.messageFormSubmit(id, text, time, spanText, file)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(VKeyboard);
