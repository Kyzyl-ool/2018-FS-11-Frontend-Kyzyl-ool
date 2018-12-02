import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';
import * as initialValues from './initialValues';


const initalStore = {
  messages: initialValues.mockMessages,
};

const reducer = (state = initalStore, action) => {
  switch (action.type) {
    case actionTypes.MESSAGE_FORM_SUBMIT:
      const tmp = Object.assign({}, state.messages);

      tmp[action.payload.id].push({
        text: action.payload.text,
        time: action.payload.time,
        spanText: action.payload.spanText,
        file: action.payload.file,
        user_id: +action.payload.user_id,
        filename: action.payload.filename,
        filetype: action.payload.filetype,
        filesize: action.payload.filesize,
      });

      return updateObject(state, {messages: tmp});

    case actionTypes.GET_MESSAGES_OK: {
      return updateObject(state, {
        messages: action.payload.messages
      })
    }

    case actionTypes.FILE_LOADED: {
      const tmp = Object.assign({}, state.messages);

      // console.log(tmp);


      Object.keys(state.messages).forEach(
        (value => {
          tmp[value].forEach((value) => {
            if (value.filename === action.payload.name) {
              value.file = action.payload.file
            }
          });
        })
      );



      return updateObject(state, {
        messages: tmp
      });

    }

    default:
      return state;
  }
};

export default reducer;

