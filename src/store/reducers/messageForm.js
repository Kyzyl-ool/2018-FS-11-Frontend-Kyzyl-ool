import { updateObject } from '../utility';

const initalStore = {
  text: '',
  file: undefined
};

const reducer = (state = initalStore, action) => {
  switch (action.type) {
    case "MESSAGE_FORM_UPDATE_DATA":
      console.log(123);
      return updateObject(state, {value: state.value});
  }
  return state;
};

export default reducer;

