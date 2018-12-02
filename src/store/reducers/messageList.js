import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';
import * as initialValues from './initialValues';


const initalStore = {
  messages: initialValues.mockMessages,
};

const reducer = (state = initalStore, action) => {
  switch (action.type) {
    case actionTypes.MESSAGE_FORM_SUBMIT:
      const tmp = [...state.messages];

      tmp[action.payload.id].push({
        text: action.payload.text,
        time: action.payload.time,
        spanText: action.payload.spanText,
        file: action.payload.file,
      });
      return updateObject(state, {messages: tmp});

    default:
      return state;
  }
};

export default reducer;

