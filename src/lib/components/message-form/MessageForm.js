import React, { Component } from 'react';
import {connect} from 'react-redux';
import  './MessageForm.css';
import * as actionCreators from '../../../store/actions/index';


class MessageForm extends Component {
  onHandleSubmit (event) {
    event.preventDefault();
    this.props.onSubmit(this.props.text, this.props.file);
  }




    render() {
      return (
        <form className="MessageForm"
              onSubmit={(event) => this.onHandleSubmit(event)}
        >

          <div className="FormAndPinButton">
            <input className="InputForm"

                   onChange={(event) => this.props.onUpdateData(event.target.value)}
                   type="text"
                   placeholder="Enter your message..."/>


            <div >
              <label htmlFor="attach_file">
                <img alt="attach" className="PinFileIcon" src="http://meowbook.org/attach.png"/>
              </label>
              <input
                onChange={(event) => this.props.onSendFile(event.target.files[0])}
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

const mapStateToProps = state => {
  return {
    text: state.msgfrom.text,
    file: state.msgfrom.file,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateData: (value) => dispatch(actionCreators.messageFormUpdateValue(value)),
    onSendFile: (value) => dispatch(actionCreators.messageFormSendFile(value)),
    onSubmit: (text, file) => dispatch(actionCreators.messageFormSubmit(text, file)),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
