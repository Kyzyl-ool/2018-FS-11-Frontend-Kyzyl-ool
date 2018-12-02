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

export const onLoadMessages = () => {
  return dispatch => {
    fetch('http://127.0.0.1:5000', {
      method: 'POST',
      body: JSON.stringify({
        'jsonrpc': '2.0',
        'id': 0,
        'method': 'get_chats',
        'params': [localStorage.getItem('userId')],
      })
    })
      .then((response) => {
        response.json()
          .then(value => {
            var i = 0;
            var chat_ids = [];
            while (value.result[i]) {
              chat_ids.push(value.result[i].chat_id);
              i++;
            }


            fetch('http://127.0.0.1:5000', {
              method: 'POST',
              body: JSON.stringify(
                chat_ids.map(((value1) => {
                  return {
                    'jsonrpc': '2.0',
                    'id': value1,
                    'method': 'get_messages',
                    'params': [+value1]
                  }
                }))
              )
            })
              .then((response) => {
                response.json()
                  .then((value1 => {
                    // console.log(value1);
                    let mockMessages = {};
                    value1.forEach((resp) => {
                      mockMessages[resp.id] = [];
                      let j = 0;
                      while (resp.result[j]) {
                        mockMessages[resp.id].push(
                          {
                            text: resp.result[j].content,
                            time: new Date(resp.result[j].sent).toLocaleTimeString(),
                            user_id: resp.result[j].user_id,
                            spanText: 'Delivered'
                          }
                        );
                        j++;
                      }
                    });
                    dispatch({
                      type: actionTypes.GET_MESSAGES_OK,
                      payload: {
                        messages: mockMessages
                      }
                    })
                  }))
              })


          })
      });

  }
}
