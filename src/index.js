import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router";
import createHistory from "history/createHashHistory";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { firebase } from "@firebase/app";
import rootSaga from "./sagas";
import config from "./config";

import allReducers from "./reducers";

import App from "./components/App.jsx";

import "./assets/css/index.css";

const history = createHistory();

firebase.initializeApp(config);

const sagaMiddleware = createSagaMiddleware();

const finalCompose = compose(
  applyMiddleware(thunk, sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(allReducers, finalCompose);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <Route exact path="/" component={App} />
    </Provider>
  </Router>,
  document.getElementById("root")
);
