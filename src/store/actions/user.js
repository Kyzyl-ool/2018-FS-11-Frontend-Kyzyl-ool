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
            });

            dispatch(onCheckUserExistance(+localStorage.getItem('userId'), json_data.first_name, json_data.last_name));
          })
      })
      .catch((error) => {
        console.log('Error while getting user data.', error);
      });
  };
};

export const onCheckUserExistance = (user_id, user_first_name, user_last_name) => {
  return dispatch => {
    fetch('http://127.0.0.1:5000', {
      method: 'POST',
      body: JSON.stringify({
        'jsonrpc': '2.0',
        'id': 0,
        'method': 'check_user',
        'params': [+localStorage.getItem('userId')]
      })
    })
      .then((response) => {
        response.json()
          .then((value => {
            if (!value.result[0]) {
              fetch('http://127.0.0.1:5000', {
                method: 'POST',
                body: JSON.stringify({
                  'jsonrpc': '2.0',
                  'id': 0,
                  'method': 'create_user',
                  'params': [user_id, user_first_name+ ' ' + user_last_name, user_first_name+user_last_name]
                })
              })
                .then((response) => {
                  response.json()
                    .then((value1 => {
                      console.log(value1.result[0].user_id, 'added');
                    }))
                })
            }
          }))
      });
  }
};
