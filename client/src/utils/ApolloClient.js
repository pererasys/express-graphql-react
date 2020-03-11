/*

Written by Andrew Perera
Copyright 2020

*/

import ApolloClient from "apollo-boost";

export default new ApolloClient({
  uri: "http://localhost:3001/graphql",
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Token ${token}` : ""
      }
    });
  }
});
