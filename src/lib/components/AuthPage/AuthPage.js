import React, { Component } from 'react';
import './AuthPage.css';
import Input from '../Input/Input';
import Button from '../AuthButton/AuthButton';
import {connect} from 'react-redux';

class AuthPage extends Component {
  render() {
    return (
      <form className='AuthPage'>
        <Input
          type='input'
          placeholder='Enter your login...'
        />
        <Input
          type='password'
          placeholder='Enter your password...'
        />
        <Button/>

      </form>
    );
  }
}



export default AuthPage;
