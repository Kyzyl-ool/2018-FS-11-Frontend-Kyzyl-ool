import React, { Component } from 'react';
import SendButton from './sendButton/SendButton';
import InputForm from './InputForm/InputForm';
import  './MessageForm.css';

class MessageForm extends Component {
    constructor() {
        super();

    }
    render() {
        return (
            <div className="MessageForm">
                <InputForm></InputForm>
                <SendButton></SendButton>
            </div>
        );
    }
}

export default MessageForm;
