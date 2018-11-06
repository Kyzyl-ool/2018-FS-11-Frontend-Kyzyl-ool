import React, { Component } from 'react';
import './SendButton.css';

class SendButton extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <button className="SendButton">Send</button>
        );
    }
}

export default SendButton;
