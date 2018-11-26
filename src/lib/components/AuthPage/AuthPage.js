import React, { Component } from 'react';
import './AuthPage.css';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';


class AuthPage extends Component {
  onHandleLogin = event => {
    this.login = event.target.value;
  };
  onHandlePassword = event => {
    this.password = event.target.value;
  };

  onHandleSubmit = event => {
    event.preventDefault();

    // console.log(this.login);
    // console.log(this.password);
    this.props.onLoginTry(this.login, this.password);


  };





  render() {
    return (
      <form className='AuthPage' onSubmit={this.onHandleSubmit}>

        <div className='LoginForm'>
          <input
            type='input'
            placeholder='Enter your login...'
            onChange={this.onHandleLogin}
          />
        </div>

        <div className='PasswordForm'>
          <input
            type='password'
            placeholder='Enter your password...'
            onChange={this.onHandlePassword}
          />
        </div>

        <button className='AuthButton' onClick={this.onHandleSubmit}>
          Login
        </button>

      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    isAuthorized: state.user.isAuthorized,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginTry: (login, password) => dispatch(actionCreators.auth(login, password))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
