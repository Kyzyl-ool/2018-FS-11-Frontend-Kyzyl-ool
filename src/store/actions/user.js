import * as actionTypes from './actionTypes';

export const onGetUserData = () => {
  return dispatch => {
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

            dispatch({
              type: actionTypes.USER_DATA_LOADED,
              payload: {
                user_first_name: json_data.first_name,
                user_last_name: json_data.last_name,
              }
            })

          })
      })
      .catch((error) => {
        console.log('Error while getting user data.', error);
      });
  };
};
