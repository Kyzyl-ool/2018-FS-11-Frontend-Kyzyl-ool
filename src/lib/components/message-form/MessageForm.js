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
      new Date().toLocaleTimeString(),
      'Sending...',
      this.props.formData[this.props.id].file);
  }




    render() {
      return (
        <form className="MessageForm"
              onSubmit={(event) => this.onHandleSubmit(event)}
        >

          <div className="FormAndPinButton">
            <input className="InputForm"
                   value={this.props.formData[this.props.id].text}
                   onChange={(event) => this.props.onUpdateData(this.props.id, event.target.value)}
                   type="text"
                   placeholder="Enter your message..."/>


            <div >
              <label htmlFor="attach_file">
                <img alt="attach" className="PinFileIcon" src="http://meowbook.org/attach.png"/>
              </label>
              <input
                onChange={(event) => this.props.onSendFile(this.props.id, event.target.files[0])}
                hidden={true}
                id="attach_file"
                type="file"/>
            </div>

          </div>
          <input
            // onClick={this.props.onSubmit}
            className="SendButton" type="submit" value="Send"/>
        </form>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    formData: state.msgform.formData,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateData: (id, value) => dispatch(actionCreators.messageFormUpdateValue(id, value)),
    onSendFile: (id, value) => dispatch(actionCreators.messageFormSendFile(id, value)),
    onSubmit: (id, text, time, spanText, file) => dispatch(actionCreators.messageFormSubmit(id, text, time, spanText, file)),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
