import React, { Component } from 'react';
import  './Message.css';

class Message extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="Message">
                Message text.
            </div>
        );
    }
}

export default Message;
