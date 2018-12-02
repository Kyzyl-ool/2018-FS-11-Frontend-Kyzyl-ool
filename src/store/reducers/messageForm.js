import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';
import * as initialValues from './initialValues';

const initalStore = {
  formData: initialValues.formData,
  isFormDataUpdated: false
};

const reducer = (state = initalStore, action) => {
  switch (action.type) {
    case actionTypes.MESSAGE_FORM_UPDATE_VALUE: {
      const tmp = [...state.formData];
      tmp[action.payload.id].text = action.payload.text;
      return updateObject(state, {formData: tmp});
    }

    case actionTypes.MESSAGE_FORM_SEND_FILE: {
      const tmp = [...state.formData];
      tmp[action.payload.id].file = action.payload.file;
      return updateObject(state, { formData: tmp });
    }

    case actionTypes.MESSAGE_FORM_SUBMIT: {
      const tmp = [...state.formData];
      tmp[action.payload.id].text = '';
      tmp[action.payload.id].file = undefined;
      return updateObject(state, { formData: tmp });
    }

    case actionTypes.CHATS_LIST_LOADED: {
      let formData = {};
      let arr = Object.keys(action.payload.chatNames);
      for (var i = 0; i < arr.length; i++) {
        formData[arr[i]] = {
          text: '',
          file: undefined
        }
      }

      return updateObject(state, {
        formData
      })
    }

    default:
      return state;
  }
};

export default reducer;

