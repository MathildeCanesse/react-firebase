import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createHistory from 'history/createHashHistory';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as firebase from 'firebase';

import allReducers from './reducers';

import App from './components/App.jsx';

import './assets/css/index.css';

const history = createHistory();

const middleWare = applyMiddleware(thunk);

const finalCompose = compose(
  middleWare,
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(allReducers, finalCompose);

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBV4XzWNkU2gfNbA0TCv3OzppWacYyvmMk',
  authDomain: 'react-tchat-a0573.firebaseapp.com',
  databaseURL: 'https://react-tchat-a0573.firebaseio.com',
  projectId: 'react-tchat-a0573',
  storageBucket: 'react-tchat-a0573.appspot.com',
  messagingSenderId: '507036688490',
};

firebase.initializeApp(config);

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <Route exact path="/" component={App} />
    </Provider>
  </Router>,
  document.getElementById('root')
);
