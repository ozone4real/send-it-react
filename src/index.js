import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Switch, Route } from 'react-router-dom';
import store from './store';
import history from './history';
import { Provider } from 'react-redux';
import './index.css';

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById('root'),
);
