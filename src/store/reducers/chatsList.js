import * as initialValues from './initialValues';


const initalStore = {
  chatNames: [...initialValues.chatNames],
  amountOfUnreadMessages: [...initialValues.amountOfUnreadMessages]
};

const reducer = (state = initalStore, action) => {
  return state;
};

export default reducer;
