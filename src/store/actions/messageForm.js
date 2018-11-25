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
  return {
    type: actionTypes.MESSAGE_FORM_SUBMIT,
    payload: {
      id: id,
      text: text,
      time: time,
      spanText: spanText,
      file: file,
    }
  }
};
