import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';
import * as initialValues from './initialValues';

const initalStore = {
  formData: [...initialValues.formData]
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

    default:
      return state;
  }
};

export default reducer;

