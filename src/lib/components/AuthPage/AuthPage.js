import React, { Component } from 'react';
import './AuthPage.css';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';


class AuthPage extends Component {
  componentDidMount() {
    let url = new URL(window.location.href);
    let token = url.searchParams.get('code');
    if (!this.props.isAuthorized && token) {
      console.log('code =', token);
      fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        body: JSON.stringify({
          'jsonrpc': '2.0',
          'method': 'get_access_token',
          'id': 1,
          'params': [token]
        })
      })
        .then((response) => {
          response.json()
            .then((value) => {
              let json_value = JSON.parse(value.result);
              if (!json_value.error) {
                console.log('accessToken:', json_value.access_token);
                this.props.onSuccessLogin(json_value.access_token);
              }
            })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

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
    access_token: state.auth.access_token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginTry: () => dispatch(actionCreators.auth()),
    onSuccessLogin: (access_token) => dispatch(actionCreators.authSuccess(access_token)),

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
