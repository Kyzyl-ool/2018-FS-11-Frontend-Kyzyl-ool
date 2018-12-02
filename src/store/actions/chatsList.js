import * as actionTypes from './actionTypes';

export const onGetChatsList = (access_token, userId) => {
  fetch('http://127.0.0.1:5000', {
    method: 'POST',
    body: JSON.stringify({
      'jsonrpc': '2.0',
      'method': 'get_chats',
      'params': [userId],
      'id': 0
    })
  })
    .then((response) => {
      response.json()
        .then((value) => {
          let i = 0;
          let chat_names = [];
          while (value.result[i]) {
            chat_names.push(value.result[i].topic);
            i++;
          }
          localStorage.setItem('chatNames', chat_names);
        })
    });

  return {
    type: actionTypes.GET_CHATS_LIST,
    payload: {
      chatNames: localStorage.getItem('chatNames') ? Array.from(localStorage.getItem('chatNames').split(',')) : [],

    }
  }
};
