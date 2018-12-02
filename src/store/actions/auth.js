import * as actionTypes from './actionTypes';
import * as actionCreators from './index';

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

export const authSuccess = (access_token, userId) => {
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('userId', userId);



  fetch('http://127.0.0.1:5000', {
    method: 'POST',
    body: JSON.stringify({
      'jsonrpc': '2.0',
      'id': 0,
      'method': 'get_user_data',
      'params': [localStorage.getItem('access_token'), localStorage.getItem('userId')]
    })
  })
    .then((response) => {
      response.json()
        .then((value) => {
          // console.log(value.result);
          const json_data = JSON.parse(value.result).response[0];
          localStorage.setItem('userName', json_data.first_name);
          localStorage.setItem('userName2', json_data.last_name);
        })
    })
    .catch((error) => {
      console.log('Error while getting user data.', error);
    });

  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      access_token,
      userId,
    }
  }
};

export const auth = () => {
  return dispatch => {
    dispatch(userLoginTry());
    const W = window.open('http://127.0.0.1:5000/get_first_token');
  }
};

export const authCheck = () => {
  return dispatch => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      console.log('Logged in');
      dispatch({type: actionTypes.LOGIN_OK});
    }
    else {
      console.log('Not logged in');
      // dispatch(auth());
      // dispatch(authSuccess(access_token));
    }

  }
};
