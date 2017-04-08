import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import ApiClient from './helpers/ApiClient';
import { Layout, Home } from './containers';
import createStore from './redux/create';
// import useScroll from 'scroll-behavior/lib/useStandardScroll';

const client = new ApiClient();
const store = createStore(browserHistory, client, window.__data);

const app = document.getElementById('app');

const component = (
  <Router render={(props) =>
    <ReduxAsyncConnect {...props} helpers={{client}} filter={item => !item.deferred} />
      } history={browserHistory}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Home}/>
          </Route>
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  app
);