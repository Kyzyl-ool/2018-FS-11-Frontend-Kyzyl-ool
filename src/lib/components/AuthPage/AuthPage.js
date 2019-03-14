import React, { Component } from 'react';
import './AuthPage.css';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import { BACKEND_SERVER } from '../../../config';


class AuthPage extends Component {
  componentDidMount() {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('code');

    if (!this.props.isAuthorized && token) {
      console.log('Authorization token:', token);
      fetch(BACKEND_SERVER, {
        method: 'POST',
        body: JSON.stringify({
          'jsonrpc': '2.0',
          'method': 'get_access_token',
          'id': 0,
          'params': [token]
        })
      })
        .then((response) => {
          response.json()
            .then((value) => {
              // console.log(value);
              const json_value = JSON.parse(value.result);
              if (!json_value.error) {
                this.props.onSuccessLogin(json_value.access_token, json_value.user_id);
                // this.props.onCheckExistance(+localStorage.getItem('userId'), this.props.user_first_name+' '+this.props.user_last_name, this.props.user_first_name);
                // window.location.reload();
              }
            })
        })
        .catch((error) => {
          console.log(error);
        });
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
    user_last_name: state.user.user_last_name,
    user_first_name: state.user.user_first_name,
    isAuthorized: state.auth.isAuthorized,
    access_token: state.auth.access_token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginTry: () => dispatch(actionCreators.auth()),
    onSuccessLogin: (access_token, userId) => dispatch(actionCreators.authSuccess(access_token, userId)),
    onCheckExistance: (user_id, first_name, last_name) => dispatch(actionCreators.onCheckUserExistance(user_id, first_name, last_name)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
