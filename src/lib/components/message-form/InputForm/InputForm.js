import React, { Component } from 'react';
import './InputForm.css';

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            text: ''
        };
        this.updateData = props.updateData;
    }

    onSubmit(event) {
        this.updateData(this.state.text);
        event.preventDefault(); //Prevent page refreshing
    }

    onChange(event) {
        this.setState({text: event.target.value});
    }


    render() {
        return (
          <form onSubmit={this.onSubmit}>
            <input onChange={this.onChange} value={this.state.text} className="InputForm" type="text" placeholder="Enter your message..."/>
          </form>
        );
    }
}

export default InputForm;
