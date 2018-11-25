import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import messageFormReducer from './store/reducers/messageForm';

const rootReducer = combineReducers({
  msgfrom: messageFormReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
