import React, { Component } from 'react';
import './AuthPage.css';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';


class AuthPage extends Component {
  onHandleSubmit = event => {
    event.preventDefault();
    this.props.onLoginTry();
  };





  render() {
    return (
      <div className='AuthPage'>
        <button className='AuthButton' onClick={this.onHandleSubmit}>
          Login by VK
        </button>
      </div>
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
    onLoginTry: () => dispatch(actionCreators.auth())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
