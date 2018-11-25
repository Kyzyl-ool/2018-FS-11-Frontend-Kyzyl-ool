import { updateObject } from '../utility';

const initalStore = {
  text: '',
  file: undefined
};

const reducer = (state = initalStore, action) => {
  switch (action.type) {
    case "MESSAGE_FORM_UPDATE_DATA":
      return updateObject(state, {text: action.value});
    default:
      return state;
  }
};

export default reducer;

