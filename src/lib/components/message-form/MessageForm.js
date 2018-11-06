import React, { Component } from 'react';
import  './MessageForm.css';

class MessageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };
    }

    disp(event) {
        event.preventDefault();
      this.props.dispatcher(this.state.text);
      this.setState({text: ''});
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
                <img className="PinFileIcon" src="http://meowbook.org/attach.png"/>
              </label>
              <input hidden="true" id="attach_file" type="file"/>
            </div>

          </div>
          <input onClick={this.disp.bind(this)} className="SendButton" type="submit" value="Send"/>
        </form>
      );
      return form;
    }
}

export default MessageForm;
