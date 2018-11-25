import * as actionTypes from './actionTypes';

export const messageFormUpdateValue = (value) => {
  return {
    type: actionTypes.MESSAGE_FORM_UPDATE_VALUE,
    payload: {
      text: value
    }
  }
};

export const messageFormSendFile = (file) => {
  return {
    type : actionTypes.MESSAGE_FORM_SEND_FILE,
    payload: {
      text: file.name,
      file: file
    }
  }
};
