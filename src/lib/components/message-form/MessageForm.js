import React, { Component } from 'react';
import {connect} from 'react-redux';
import  './MessageForm.css';
import * as actionCreators from '../../../store/actions/index';


class MessageForm extends Component {
    render() {
      return (
        <form className="MessageForm"
              // onSubmit={{}}
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
            // onClick={{}}
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

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
