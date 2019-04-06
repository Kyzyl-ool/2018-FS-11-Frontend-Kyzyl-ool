import * as actionTypes from './actionTypes';
import { BACKEND_SERVER } from '../../config';



function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}



export const onCreateNewChat = (chatName, isGroup) => {
  return dispatch => {
    fetch(BACKEND_SERVER, {
      method: 'POST',
      body: JSON.stringify({
        'jsonrpc': '2.0',
        'method': 'new_chat',
        'params': [chatName, isGroup],
        'id': 0
      })
    })
      .then((response) => {
        response.json()
          .then((value => {
            // console.log(value.result[0].chat_id);

            fetch(BACKEND_SERVER, {
              method: 'POST',
              body: JSON.stringify({
                'jsonrpc': '2.0',
                'method': 'add_new_member_to_chat',
                'params': [+localStorage.getItem('userId'), value.result[0].chat_id],
                'id': 0
              })
            })
              .then((response) => {
                response.json()
                  .then((value1 =>
                  {
                    console.log(value1);
                  }))
              });

            window.location.reload();


            dispatch({
              type: actionTypes.CHATS_LIST_NEW_CHAT_OK,
              payload: {
                chatName,
                isGroup,
              }
            });
          }))
      })
  }
};

export const onLoadChatNames = () => {
  return dispatch => {
    fetch(BACKEND_SERVER, {
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
    fetch(BACKEND_SERVER, {
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


            if (i > 0)
            fetch(BACKEND_SERVER, {
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
                    let mockMessages = {};
                    value1.forEach((resp) => {
                      mockMessages[resp.id] = [];
                      let j = 0;
                      while (resp.result[j]) {
                        if (resp.result[j].url)
                        {
                          fetch(BACKEND_SERVER, {
                            method: 'POST',
                            body: JSON.stringify({
                              'jsonrpc': '2.0',
                              'id': 0,
                              'method': 'download_file',
                              'params': [resp.result[j].url.replace(' ', '_'), resp.result[j].type],
                            })
                          })
                            .then((response) => {
                              response.json()
                                .then((value2 => {
                                  var filetype = value2.result.type;
                                  var name = value2.result.name;

                                  dispatch({
                                    type: actionTypes.FILE_LOADED,
                                    payload: {
                                      file: b64toBlob(value2.result.file, filetype, 512),
                                      name
                                    }
                                  })

                                }))
                            })
                        }


                        mockMessages[resp.id].push(
                          {
                            text: resp.result[j].content,
                            time: new Date(resp.result[j].sent).toLocaleTimeString(),
                            user_id: resp.result[j].user_id,
                            spanText: 'Delivered',
                            message_id: resp.result[j].message_id,
                            filename: resp.result[j].url,
                            filetype: resp.result[j].type,
                            filesize: resp.result[j].size,
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
                    });
                  }))
              })


          })
      });

  }
};
