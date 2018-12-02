import * as actionTypes from './actionTypes';

export const messageFormUpdateValue = (id, value) => {
  return {
    type: actionTypes.MESSAGE_FORM_UPDATE_VALUE,
    payload: {
      text: value,
      id: id
    }
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
        fetch('http://127.0.0.1:5000/', {
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

      reader.readAsBinaryString(file);


      fetch('http://127.0.0.1:5000/', {
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
              console.log(value);


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
      fetch('http://127.0.0.1:5000/', {
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
              console.log(value);
              dispatch({
                type: actionTypes.MESSAGE_FORM_SUBMIT,
                payload: {
                  id: id,
                  text: text,
                  time: time,
                  spanText: spanText,
                  user_id: localStorage.getItem('userId')
                }
              });
              return value.result.code === 200 ? 'Delivered' : 'ERROR';
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
