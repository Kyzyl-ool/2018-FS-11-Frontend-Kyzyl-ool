import * as actionTypes from './actionTypes';

export const onLoadChatNames = () => {
  return dispatch => {
    fetch('http://127.0.0.1:5000', {
      method: 'POST',
      body: JSON.stringify({
        'jsonrpc': '2.0',
        'method': 'get_chats',
        'params': [+localStorage.getItem('userId')],
        'id': 0
      })
    })
      .then((response) => {
        response.json()
          .then((value) => {
            // console.log(value);
            let i = 0;
            let chatNames = {};
            while (value.result[i]) {
              chatNames[value.result[i].chat_id] = value.result[i].topic;
              i++;
            }

            dispatch(onChatsListLoaded(chatNames));
          })
          .catch((error) => {
            dispatch(onChatsListLoadFail(error));
          });
      })
      .catch((error) => {
        dispatch(onChatsListLoadFail(error));
      });
  }
};

export const onChatsListLoaded = (chatNames) => {
  return {
    type: actionTypes.CHATS_LIST_LOADED,
    payload: {
      chatNames
    }
  }
};

export const onChatsListLoadFail = (error) => {
  return {
    type: actionTypes.CHATS_LIST_LOAD_FAIL,
    payload: {
      error
    }
  }
};
