import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';


const initalStore = {
  user_first_name: '',
  user_last_name: '',
  userId: -1
};

const reducer = (state = initalStore, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DATA: {
      return updateObject(state, {
        user_last_name: action.payload.user_last_name,
        user_first_name: action.payload.user_first_name,
      })
    }
    default:
      return state;
  }
};

export default reducer;

