import React, { Component } from 'react';
import SendButton from './sendButton/SendButton';
import InputForm from './InputForm/InputForm';
import  './MessageForm.css';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = props.onSubmit;
    }

    handleSubmit(event) {
        alert("HELLOO");
        event.preventDefault();
    }

    render() {
        return (
            <div className="MessageForm">
                <InputForm />
                <SendButton />
            </div>
        );
    }
}

export default MessageForm;
