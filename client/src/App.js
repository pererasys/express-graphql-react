// Written by Andrew Perera
// Copyright 2020

import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { reducers } from "./reducers";
import ReduxThunk from "redux-thunk";
import Router from "./router";

class App extends Component {
  render() {
    const store = createStore(
      combineReducers(reducers),
      {},
      applyMiddleware(ReduxThunk)
    );
    const persistor = persistStore(store);
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <div id="app">
            <Router />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
