import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';


const initalStore = {
  emojiAmount: 0,
  emojis: []
};

const reducer = (state = initalStore, action) => {
  switch (action.type) {
    case actionTypes.EMOJI_FILENAMES_LOADED: {
      // console.log(action.payload.filenames);
      return updateObject(state, {
        emojiAmount: action.payload.filenames,
      })
    }
    default:
      return state;
  }
};

export default reducer;
