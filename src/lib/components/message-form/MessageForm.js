import React, { Component } from 'react';
import  './MessageForm.css';

class MessageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            file: undefined
        };
    }

    disp(event) {
      event.preventDefault();
      this.props.dispatcher({text: this.state.text, file: undefined});
      this.setState({text: ''});
    }

    fileMessage(event) {
        event.preventDefault();
        this.props.dispatcher({text: event.target.files[0].name, file: event.target.files[0]});
    }


    updateData(event) {
        this.setState({text: event.target.value});
    }

    render() {

      let form = (
        <form className="MessageForm" onSubmit={this.disp.bind(this)}>
          <div className="FormAndPinButton">
            <input className="InputForm" value={this.state.text}

                   onChange={this.updateData.bind(this)} type="text"
                   placeholder="Enter your message..."/>


            <div >
              <label htmlFor="attach_file">
                <img alt="attach" className="PinFileIcon" src="http://meowbook.org/attach.png"/>
              </label>
              <input onChange={this.fileMessage.bind(this)} hidden={true} id="attach_file" type="file"/>
            </div>

          </div>
          <input onClick={this.disp.bind(this)} className="SendButton" type="submit" value="Send"/>
        </form>
      );
      return form;
    }
}

export default MessageForm;
