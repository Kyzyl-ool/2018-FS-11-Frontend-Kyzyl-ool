import React, { Component } from 'react';
import './SendButton.css';

class SendButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <input value="Send" type="submit" className="SendButton" />
        );
    }
}

export default SendButton;
