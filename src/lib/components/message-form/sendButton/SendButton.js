import React, { Component } from 'react';
import './SendButton.css';

class SendButton extends Component {
    constructor(props) {
        super(props);

        this.foo = props.onPress;
    }


    render() {
        return (
            <input onClick={this.foo} value="Send" type="submit" className="SendButton" />
        );
    }
}

export default SendButton;
