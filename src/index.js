import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import messageFormReducer from './store/reducers/messageForm';
import messageListReducer from './store/reducers/messageList';
import chatsListReducer from './store/reducers/chatsList';
import userReducer from './store/reducers/user';
import authReducer from './store/reducers/auth';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  msgform: messageFormReducer,
  msglist: messageListReducer,
  chatslist: chatsListReducer,
  user: userReducer,
  auth: authReducer,
  
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
