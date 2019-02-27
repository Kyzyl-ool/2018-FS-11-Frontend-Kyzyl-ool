import React, { Component } from 'react';
import './VKeyboard.css';
import Aux from '../../../hoc/Aux/Aux';
import {connect} from 'react-redux';
import { BACKEND_SERVER, JUST_SERVER } from '../../../config';
import * as actionCreators from '../../../store/actions/index';

class VKeyboard extends Component {
  constructor(props) {
    super(props);

    if (this.props.emojiFilenames.length === 0)
      fetch(BACKEND_SERVER, {
        method: 'POST',
        body: JSON.stringify({
          'jsonrpc': '2.0',
          'method': 'get_emoji_filenames',
          'id': 0
        })
      })
        .then((response => {
          response.json()
            .then((value =>
            {
              const tmp = value.result;
              tmp.sort();
              this.props.onEmojiFilenamesLoaded(tmp);
            }))
        }))
  }

  // componentDidMount() {
  //   console.log(this.props.isEnabled);
  // }

  onEmojiClick(event) {
    // console.log(event.target.src);
    this.props.onEmojiClick(this.props.id, event.target.src);

  }


  render() {
    return (
      <Aux>
        <div className='VKeyboard' hidden={!this.props.isEnabled} >
          {
            this.props.emojiFilenames.map(
            (value, index) => (
              <img
                key={index}
                src={JUST_SERVER+'/public/emoji/labeled/32/regional/'+value}
                className='emoji'
                onClick={(event) => this.onEmojiClick(event)}
              />)
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
    emojiFilenames: state.vkeyboard.emojiFilenames
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onEmojiFilenamesLoaded: (filenames) => dispatch(actionCreators.onEmojiFilenameLoaded(filenames)),
    onEmojiClick: (id, source) => dispatch(actionCreators.onEmojiClick(id, source)),

  }
};


export default connect(mapStateToProps, mapDispatchToProps)(VKeyboard);
