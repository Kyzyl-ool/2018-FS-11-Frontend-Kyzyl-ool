import { updateObject } from '../updateObject';
import * as actionTypes from '../actions/actionTypes';


const initalStore = {
  access_token: null,
  loading: false,
  error: null,
  isAuthorized: false,
};

const reducer = (state = initalStore, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_TRY: {
      return updateObject(state, {
        loading: true
      })
    }
    case actionTypes.LOGIN_SUCCESS: {
      return updateObject(state, {
        access_token: action.payload.access_token,
        userId: action.payload.userId,
        loading: false,
        isAuthorized: true
      })
    }
    case actionTypes.LOGIN_FAIL: {
      return updateObject(state, {
        error: action.payload.error,
        loading: false
      })
    }
    case actionTypes.LOGIN_OK: {
      return updateObject(state, {
        isAuthorized: true
      })
    }
    default:
      return state;
  }
};

export default reducer;

