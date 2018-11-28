import * as initialValues from './initialValues';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initalStore = {
  chatNames: [...initialValues.chatNames],
  needToUpdate: true
};

const reducer = (state = initalStore, action) => {
  switch (action.type) {
    case actionTypes.GET_CHATS_LIST: {
      fetch('http://127.0.0.1:5000', {
        method: 'POST',
        body: JSON.stringify({
          'jsonrpc': '2.0',
          'method': 'get_chats',
          'params': [action.payload.userId],
          'id': 0
        })
      })
        .then((response) => {
            response.json()
              .then((value) => {
                let i = 0;
                let chat_names = [];
                while (value.result[i]) {
                  chat_names.push(value.result[i].topic);
                  i++;
                }
                localStorage.setItem('chatNames', chat_names);
              })
          });

      return updateObject(state, {
        chatNames: [...Array.from(localStorage.getItem('chatNames').split(','))],
        // amountOfUnreadMessages: [...Array.from(localStorage.getItem('amountOfUnreadMessages').split(','))],
        needToUpdate: false,
      });
    }
    default:
      return state;
  }
};

export default reducer;

