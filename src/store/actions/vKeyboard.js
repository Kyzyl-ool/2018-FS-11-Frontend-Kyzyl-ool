import * as actionTypes from './actionTypes';

export const onEmojiFilenameLoaded = (filenames) => {
  return {
    type: actionTypes.EMOJI_FILENAMES_LOADED,
    payload: {
      filenames
    }
  }
};

export const onEmojiClick  = (id, source) => {
  return {
    type: actionTypes.EMOJI_CLICK,
    payload: {
      source,
      id
    }
  }
};
