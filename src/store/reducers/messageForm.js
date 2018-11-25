import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initalStore = {
  text: '',
  file: undefined
};

const reducer = (state = initalStore, action) => {
  switch (action.type) {
    case actionTypes.MESSAGE_FORM_UPDATE_VALUE:
      return updateObject(state, {text: action.payload.text});

    case actionTypes.MESSAGE_FORM_SEND_FILE:
      return updateObject(state, {file: action.payload.file});

    case actionTypes.MESSAGE_FORM_SUBMIT:
      return updateObject(state, {});

    default:
      return state;
  }
};

export default reducer;

