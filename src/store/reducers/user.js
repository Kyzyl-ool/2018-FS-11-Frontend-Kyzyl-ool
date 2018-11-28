import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';


const initalStore = {
  user: '',
  userId: -1,
  isAuthorized: false,
};

const reducer = (state = initalStore, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS: {
      return updateObject(state, {
        user: action.payload.userName,
        isAuthorized: true
      })
    }
    case actionTypes.LOGIN_OK: {
      return updateObject( state, {
        isAuthorized: true
      })
    }
    default:
      return state;
  }
};

export default reducer;

