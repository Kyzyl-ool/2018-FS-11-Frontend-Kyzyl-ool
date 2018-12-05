import * as initialValues from './initialValues';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initalStore = {
  chatNames: initialValues.chatNames,
  needToUpdate: true
};

const reducer = (state = initalStore, action) => {
  switch (action.type) {
    case actionTypes.GET_CHATS_LIST: {
      return updateObject(state, {
        needToUpdate: false,
      });
    }

    case actionTypes.CHATS_LIST_LOADED: {
      return updateObject(state, {
        chatNames: action.payload.chatNames,
        needToUpdate: false
      })
    }

    default:
      return state;
  }
};

export default reducer;

