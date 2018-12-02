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
    payload: {
      loading: true
    }
  }
};

export const authSuccess = (access_token, userId) => {
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('userId', userId);

  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      access_token,
      userId,
      loading: false,
    }
  }
};

export const auth = () => {
  return dispatch => {
    dispatch(userLoginTry());
    window.open('http://127.0.0.1:5000/get_first_token');
  }
};

export const authCheck = () => {
  return dispatch => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      console.log('Logged in');
      dispatch(actionCreators.onGetUserData());
      dispatch({type: actionTypes.LOGIN_OK});
    }
    else {
      console.log('Not logged in');
      // dispatch(auth());
      // dispatch(authSuccess(access_token));
    }

  }
};
