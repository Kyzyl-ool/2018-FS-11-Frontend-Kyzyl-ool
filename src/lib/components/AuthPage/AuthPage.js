import React, { Component} from 'react';
import styles from './AuthPage.module.css';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import { BACKEND_SERVER } from '../../../config';


class AuthPage extends Component {
  async getAccessToken(first_token) {
    const response = await fetch(BACKEND_SERVER, {
      method: 'POST',
      body: JSON.stringify({
        'jsonrpc': '2.0',
        'method': 'get_access_token',
        'id': 0,
        'params': [first_token]
      })
    });

    const json_value = JSON.parse((await response.json()).result);
    if (!json_value.error) {
      this.props.onSuccessLogin(json_value.access_token, json_value.user_id);
    }
  }

  componentDidMount() {
    const url = new URL(window.location.href);
    const first_token = url.searchParams.get('code');

    if (!this.props.isAuthorized && first_token) {
      console.log('Authorization token:', first_token);
      this.getAccessToken(first_token);
    }
  }

  onHandleSubmit = event => {
    event.preventDefault();
    this.props.onLoginTry();
  };

  render() {
    return (
      <div className={styles.AuthPage}>
        <button className={styles.AuthButton} onClick={this.onHandleSubmit}>
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
