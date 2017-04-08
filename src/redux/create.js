import { createStore as _createStore, applyMiddleware} from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
// import createLogger from 'redux-logger';

export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [createMiddleware(client), reduxRouterMiddleware];

  let finalCreateStore = applyMiddleware(...middleware)(_createStore);

  const reducer = require('./modules/reducer').default;
  const store = finalCreateStore(reducer, data);

  return store;
}
