import * as actionTypes from './actionTypes';

// axios.interceptors.response.use((response) => {
//   return response;
// }, (error) => {
//   return Promise.resolve({
//     data: {
//       token: 'adsadasdsa2764782rwfa2trfkdhsjc',
//     },
//     status: 200,
//     statusText: 'OK',
//     header: {},
//     config: error.config,
//   })
// } );

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

export const authSuccess = (access_token) => {
  localStorage.setItem('access_token', access_token);
  // window.close();
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      access_token
    }
  }
};

export const auth = () => {
  return dispatch => {
    dispatch(userLoginTry());
    window.open('http://127.0.0.1:5000/get_first_token');




    // axios.post('http://127.0.0.1:5000/', {login, password})
    //   .then(response => {
    //     console.log(response);
    //     localStorage.setItem('token', response.data.token);
    //     dispatch(userLoginSuccess(response.data.token));
    //   })
    //   .catch(error => {
    //     dispatch(userLoginFail(error));
    //   })
  }
};

export const authCheck = () => {
  return dispatch => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      dispatch(authSuccess(access_token));
      console.log('Logged in');
    }
    else {
      console.log('Not logged in');
    }

  }
};
