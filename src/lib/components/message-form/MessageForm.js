import React, { Component } from 'react';
import  './MessageForm.css';

class MessageForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="MessageForm">
                <input className="InputForm" type="text" placeholder="Enter your message..."/>
                <input className="SendButton" type="submit" value="Send" />
            </div>
        );
    }
}

export default MessageForm;
