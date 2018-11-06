import React, { Component } from 'react';
import SendButton from './sendButton/SendButton';
import InputForm from './InputForm/InputForm';
import styles from './MessageForm.css';

class MessageForm extends Component {
    constructor() {
        super();

    }
    render() {
        return (
            <div>
                <InputForm></InputForm>
                <SendButton></SendButton>
            </div>
        );
    }
}

export default MessageForm;
