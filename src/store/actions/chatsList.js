import * as actionTypes from './actionTypes';

export const onGetChatsList = (access_token, userId) => {
  return {
    type: actionTypes.GET_CHATS_LIST,
    payload: {
      access_token,
      userId,
    }
  }
};

