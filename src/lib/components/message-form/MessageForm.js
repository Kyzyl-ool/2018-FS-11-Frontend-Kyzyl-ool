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
        return (
              <form className="MessageForm" onSubmit={this.disp.bind(this)}>
              <input  value={this.state.text} onChange={this.updateData.bind(this)} className="InputForm" type="text" placeholder="Enter your message..."/>
                <input onClick={this.disp.bind(this)} className="SendButton" type="submit" value="Send" />
              </form>
        );
    }
}

export default MessageForm;
