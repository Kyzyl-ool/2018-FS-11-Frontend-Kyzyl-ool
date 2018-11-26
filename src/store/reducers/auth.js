import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';


const initalStore = {
  token: null,
  loading: false,
  error: null
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
        token: action.payload.token,
        loading: false
      })
    }
    case actionTypes.LOGIN_FAIL: {
      return updateObject(state, {
        error: action.payload.error,
        loading: false
      })
    }
    default:
      return state;
  }
};

export default reducer;

