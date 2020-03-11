/*

Written by Andrew Perera
Copyright 2020

*/

import React, { Component } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import Router from "./router";
import Client from "./utils/ApolloClient";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={Client}>
        <div id="app">
          <Router />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
