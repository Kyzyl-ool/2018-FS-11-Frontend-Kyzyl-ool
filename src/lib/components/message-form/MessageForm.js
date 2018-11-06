import React, { Component } from 'react';
import SendButton from './sendButton/SendButton';
import InputForm from './InputForm/InputForm';
import  './MessageForm.css';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.dispatchNewMessageEvent = props.dispatcher;
    }

    updateData = (value) => {
        this.dispatchNewMessageEvent(value);
    };

    render() {
        return (
            <div className="MessageForm">
                <InputForm updateData={this.updateData} />
                <SendButton />
            </div>
        );
    }
}

export default MessageForm;
