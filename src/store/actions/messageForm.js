import * as actionTypes from './actionTypes';
import { BACKEND_SERVER } from '../../config';

export const onNewMessage = (values) => {
  return dispatch => {
    if (values.data.filename) {
      fetch(BACKEND_SERVER, {
        method: 'POST',
        body: JSON.stringify({
          'jsonrpc': '2.0',
          'id': 0,
          'method': 'download_file',
          'params': [values.data.filename, values.data.type],
        })
      })
        .then((response) => {
          response.json()
            .then(value2 => {
              var binaryFile = atob(value2.result.file);
              var filetype = value2.result.type;
              var name = value2.result.name;
              var lastmodified = new Date(value2.result.lastmodified);

              var blob = new Blob([binaryFile], {
                type: filetype,
              });
              blob.lastModifiedDate = lastmodified;
              blob.name = name;

              dispatch({
                type: actionTypes.FILE_LOADED,
                payload: {
                  data: values.data,
                  file: blob,
                  name: name
                }
              });

            })
        });
    }

    dispatch({
      type: actionTypes.CENTRIFUGO_NEW_MESSAGE,
      payload: values
    });
  }
};

export const messageFormUpdateValue = (id, value) => {
  return {
    type: actionTypes.MESSAGE_FORM_UPDATE_VALUE,
    payload: {
      text: value,
      id: id
    }
  }
};

export const messageFormToggleVKeyboard = (id) => {
  return {
    type: actionTypes.TOGGLE_VKEYBOARD
  }
};

export const messageFormSendFile = (id, file) => {
  return {
    type : actionTypes.MESSAGE_FORM_SEND_FILE,
    payload: {
      id: id,
      file: file
    }
  }
};

export const messageFormSubmit = (id, text, time, spanText, file) => {
  return dispatch => {
    if (file) {
      let reader = new FileReader();
      reader.onload = (value) => {
        fetch(BACKEND_SERVER, {
          method: 'POST',
          body: JSON.stringify({
            'jsonrpc': '2.0',
            'id': 0,
            'method': 'upload_file',
            'params': [btoa(reader.result), file.name],
          })
        })
          .then((response) => {
            response.json()
              .then(value => {
                // console.log(value);
              })
          });
      };

      console.log(file);
      reader.readAsBinaryString(file);


      fetch(BACKEND_SERVER, {
        method: 'POST',
        body: JSON.stringify({
          'jsonrpc': '2.0',
          'id': 0,
          'method': 'new_file_message',
          'params': [+id, +localStorage.getItem('userId'), text, file.name, file.type, file.size],
        })
      })
        .then((response) => {
          response.json()
            .then((value => {
              // console.log(value);


              dispatch({
                type: actionTypes.MESSAGE_FORM_SUBMIT,
                payload: {
                  id: id,
                  text: text,
                  time: time,
                  spanText: spanText,
                  filename: file.name,
                  filetype: file.type,
                  filesize: file.size,
                  file: file,
                  user_id: +localStorage.getItem('userId')
                }

              });
              // return value.result.code === 200 ? 'Delivered' : 'ERROR';

            }))
        })



    }
    else {
      fetch(BACKEND_SERVER, {
        method: 'POST',
        body: JSON.stringify({
          'jsonrpc': '2.0',
          'id': 0,
          'method': 'new_message',
          'params': [+id, +localStorage.getItem('userId'), text],
        })
      })
        .then((response) => {
          return response.json()
            .then((value) => {
              // console.log(value);
              dispatch({
                type: actionTypes.MESSAGE_FORM_SUBMIT,
                payload: {
                  id: id,
                  text: text,
                  time: time,
                  spanText: spanText,
                  user_id: +localStorage.getItem('userId')
                }
              });
              // return value.result.code === 200 ? 'Delivered' : 'ERROR';
              // dispatch({
              //   type: actionTypes.MESSAGE_DELIVERED,
              //   payload: {
              //     message_id:
              //   }
              // })
            });
        });

    }

  }
};
