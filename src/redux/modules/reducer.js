import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import voices from './voices';

const rootReducer = combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  voices
});

export default rootReducer;
