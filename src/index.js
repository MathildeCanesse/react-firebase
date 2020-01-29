import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
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

firebase.initializeApp(config);

const sagaMiddleware = createSagaMiddleware();

const finalCompose = compose(
  applyMiddleware(thunk, sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : f => f
);

const store = createStore(allReducers, finalCompose);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
