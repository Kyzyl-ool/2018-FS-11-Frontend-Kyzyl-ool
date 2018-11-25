import * as actionTypes from './actionTypes';
// import {updateObject} from '../utility';

export const updateMessageForm = (value) => {
  return {
    type: actionTypes.UPDATE_MESSAGE_FORM,
    payload: {
      text: value
    }
  }
};
