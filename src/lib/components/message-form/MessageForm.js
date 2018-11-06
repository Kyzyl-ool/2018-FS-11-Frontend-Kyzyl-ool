import React, { Component } from 'react';
import SendButton from './sendButton/SendButton';
import InputForm from './InputForm/InputForm';
import  './MessageForm.css';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentText: ''
        };
    }

    updateData = (value) => {
        this.setState({currentText: value});
    };

    sendData() {
        this.props.dispatcher(this.state.currentText);
    };

    render() {
        return (
            <div className="MessageForm">
                <InputForm updateData={this.updateData} onPress={this.sendData.bind(this)}/>
                <SendButton onPress={this.sendData.bind(this)} />
            </div>
        );
    }
}

export default MessageForm;
