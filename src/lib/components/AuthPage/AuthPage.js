import React, { Component } from 'react';
import './AuthPage.css';
import Input from '../Input/Input';
import Button from '../AuthButton/AuthButton';

class AuthPage extends Component {
  render() {
    return (
      <div className='AuthPage'>
        <Input
          type='input'
          placeholder='Enter your login...'
        />
        <Input
          type='password'
          placeholder='Enter your password...'
        />
        <Button/>

      </div>
    );
  }
}

export default AuthPage;
