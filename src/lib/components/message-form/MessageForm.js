import React, { Component } from 'react';
import  './MessageForm.css';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';


class MessageForm extends Component {
  onHandleSubmit (event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.props.formData[this.props.id].text,
      new Date().toISOString(),
      'Sending...',
      this.props.formData[this.props.id].file);
  }

  onVirtualKeyboardButtonClick () {
    this.props.onToggleVKeyboard(this.props.id);
  }

    render() {
      return (
        <form className="MessageForm"
              onSubmit={this.onHandleSubmit}
        >

          <div className="FormAndPinButton">
            <input className="InputForm"
                   value={this.props.formData[this.props.id].text}
                   onChange={(event) => this.props.onUpdateData(this.props.id, event.target.value)}
                   type="text"
                   placeholder="Enter your message..."
                   autoFocus={true}
            />

            <span onClick={this.onVirtualKeyboardButtonClick.bind(this)}>
                <img alt="open_virtual_keyboard" className="VirtualKeyboardIcon" src="http://meowbook.ru/keyboard.png"/>
            </span>

            <div >
              <label htmlFor="attach_file">
                <img alt="attach" className="PinFileIcon" src="http://meowbook.ru/attach.png"/>
              </label>
              <input
                onChange={(event) => this.props.onSendFile(this.props.id, event.target.files[0])}
                hidden={true}
                id="attach_file"
                type="file"/>
            </div>



          </div>
          <input
            onClick={(event) => this.onHandleSubmit(event)}
            className="SendButton" type="submit" value="Send"/>
        </form>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    formData: state.msgform.formData,
    isFormDataUpdated: state.msgform.isFormDataUpdated,
    isVKeyboardEnabled: state.msgform.isVKeyboardEnabled
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateData: (id, value) => dispatch(actionCreators.messageFormUpdateValue(id, value)),
    onSendFile: (id, value) => dispatch(actionCreators.messageFormSendFile(id, value)),
    onSubmit: (id, text, time, spanText, file) => dispatch(actionCreators.messageFormSubmit(id, text, time, spanText, file)),
    onToggleVKeyboard: (id) => dispatch(actionCreators.messageFormToggleVKeyboard(id)),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
