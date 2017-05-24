import 'babel-polyfill';
import React from 'react';
import thunk from 'redux-thunk';
import reducers from './reducers';
import AppContainer from './containers/AppContainer';
import LoginContainer from './containers/LoginContainer';
import DashboardContainer from './containers/DashboardContainer';
import NoteListContainer from './containers/NoteListContainer';
import NoteContainer from './containers/NoteContainer';
import { initUser } from './actions/user';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';

let store = createStore(
  reducers,
  applyMiddleware(thunk)
);

let onEnter = (nextState) => {
  store.dispatch(initUser((err) => {
    let path = nextState.location.pathname;
    if(path === '/' && !err) {
      return browserHistory.push('/dashboard');
    }
    if(path !== '/' && err) {
      return browserHistory.push('/');
    }
  }));
};

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={AppContainer}>
        <IndexRoute component={LoginContainer} onEnter={onEnter}/>
        <Route path='/dashboard' component={DashboardContainer} onEnter={onEnter}/>
        <Route path='/notes' component={NoteListContainer} onEnter={onEnter}/>
        <Route path='/:name' component={NoteContainer} onEnter={onEnter}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
