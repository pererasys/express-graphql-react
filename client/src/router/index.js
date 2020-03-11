/*

Written by Andrew Perera
Copyright 2020

*/

import React from "react";
import { Router as DOMRouter, Route, Switch } from "react-router-dom";
import history from "../history";
import CreateUser from "../pages/CreateUser";
import Chat from "../pages/Chat";

export default function() {
  return (
    <DOMRouter history={history}>
      <Switch>
        <Route path="/" exact component={CreateUser} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </DOMRouter>
  );
}
