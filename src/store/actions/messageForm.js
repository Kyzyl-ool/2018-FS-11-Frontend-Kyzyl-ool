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
  fetch('http://127.0.0.1:5000/', {
    method: 'POST',
    body: JSON.stringify({
      'jsonrpc': '2.0',
      'id': 0,
      'method': 'new_message',
      'params': [id, +localStorage.getItem('userId'), text],
    })
  })
    .then((response) => {
      return response.json()
        .then((value) => {
          return value.result.code === 200 ? 'Delivered' : 'ERROR';
        });
    });

  return {
    type: actionTypes.MESSAGE_FORM_SUBMIT,
    payload: {
      id: id,
      text: text,
      time: time,
      spanText: spanText,
      file: file,
      user_id: localStorage.getItem('userId')
    }
  }
};
