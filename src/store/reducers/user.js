import { updateObject } from '../updateObject';
import * as actionTypes from '../actions/actionTypes';


const initalStore = {
  user_first_name: '',
  user_last_name: '',
  userId: -1
};

const reducer = (state = initalStore, action) => {
  switch (action.type) {
    case actionTypes.USER_DATA_LOADED: {
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
