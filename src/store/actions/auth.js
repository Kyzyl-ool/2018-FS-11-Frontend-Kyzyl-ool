import * as actionTypes from './actionTypes';
import axios from 'axios';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.resolve({
    data: {
      token: 'adsadasdsa2764782rwfa2trfkdhsjc',
    },
    status: 200,
    statusText: 'OK',
    header: {},
    config: error.config,
  })
} );

export const userLoginSuccess = (token) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      token: token
    }
  }
};

export const userLoginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    payload: {
      error
    }
  }
};

export const userLoginTry = () => {
  return {
    type: actionTypes.LOGIN_TRY,
  }
};

export const auth = (login, password) => {
  return dispatch => {
    dispatch(userLoginTry());
    axios.post('/auth', {login, password})
      .then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
        dispatch(userLoginSuccess(response.data.token));
      })
      .catch(error => {
        dispatch(userLoginFail(error));
      })
  }
};

export const authCheck = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(userLoginSuccess(token));
      console.log('Logged in');
    }
    else {
      console.log('Not logged in');
    }

  }
};
